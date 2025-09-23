import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateBookingDto, UpdateBookingDto, CheckAvailabilityDto, BookingQueryDto } from './dto/create-booking.dto';
import { BookingResponseDto, AvailabilityResponseDto, BookingStatsDto } from './dto/booking-response.dto';
import { BookingStatus, Role } from '@prisma/client';

@Injectable()
export class BookingsService {
  private readonly logger = new Logger(BookingsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto, userId: string): Promise<BookingResponseDto> {
    const { vehicleId, startAt, endAt } = createBookingDto;

    // Validate dates
    const startDate = new Date(startAt);
    const endDate = new Date(endAt);
    
    if (startDate >= endDate) {
      throw new BadRequestException('End date must be after start date');
    }

    if (startDate < new Date()) {
      throw new BadRequestException('Cannot book in the past');
    }

    // Check vehicle availability
    const availability = await this.checkAvailability({
      vehicleId,
      startAt,
      endAt,
    });

    if (!availability.isAvailable) {
      throw new ConflictException('Vehicle is not available for the selected time period');
    }

    // Get vehicle details for pricing
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    // Calculate price
    const hours = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60));
    const totalCents = hours * vehicle.priceCents;

    // Create booking
    const booking = await this.prisma.booking.create({
      data: {
        userId,
        vehicleId,
        startAt: startDate,
        endAt: endDate,
        totalCents,
        status: BookingStatus.PENDING,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        vehicle: true,
      },
    });

    this.logger.log(`Booking created: ${booking.id} for user ${userId}`);

    return booking;
  }

  async findAll(query: BookingQueryDto, currentUser: any): Promise<{ bookings: BookingResponseDto[]; total: number; page: number; limit: number }> {
    const { page = 1, limit = 10, status, userId, vehicleId } = query;
    const skip = (page - 1) * limit;

    // Build where clause based on user role
    let where: any = {};

    if (currentUser.role === Role.CUSTOMER) {
      // Customers can only see their own bookings
      where.userId = currentUser.id;
    } else if (currentUser.role === Role.STAFF) {
      // Staff can see bookings but with limited access
      where = {};
    }
    // ADMIN can see all bookings (no additional where clause)

    if (status) {
      where.status = status;
    }

    if (userId && (currentUser.role === Role.ADMIN || currentUser.role === Role.STAFF)) {
      where.userId = userId;
    }

    if (vehicleId) {
      where.vehicleId = vehicleId;
    }

    const [bookings, total] = await Promise.all([
      this.prisma.booking.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
          vehicle: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.booking.count({ where }),
    ]);

    return {
      bookings,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string, currentUser: any): Promise<BookingResponseDto> {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        vehicle: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Check permissions
    if (currentUser.role === Role.CUSTOMER && booking.userId !== currentUser.id) {
      throw new ForbiddenException('You can only view your own bookings');
    }

    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto, currentUser: any): Promise<BookingResponseDto> {
    const existingBooking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!existingBooking) {
      throw new NotFoundException('Booking not found');
    }

    // Check permissions
    if (currentUser.role === Role.CUSTOMER) {
      if (existingBooking.userId !== currentUser.id) {
        throw new ForbiddenException('You can only update your own bookings');
      }
      // Customers can only update certain fields
      const allowedFields = ['status'];
      const restrictedFields = Object.keys(updateBookingDto).filter(
        key => !allowedFields.includes(key)
      );
      if (restrictedFields.length > 0) {
        throw new ForbiddenException(`You can only update: ${allowedFields.join(', ')}`);
      }
    }

    // If updating dates or vehicle, check availability
    if (updateBookingDto.startAt || updateBookingDto.endAt || updateBookingDto.vehicleId) {
      const startAt = updateBookingDto.startAt || existingBooking.startAt;
      const endAt = updateBookingDto.endAt || existingBooking.endAt;
      const vehicleId = updateBookingDto.vehicleId || existingBooking.vehicleId;

      if (vehicleId) {
        const availability = await this.checkAvailability({
          vehicleId,
          startAt: startAt.toISOString(),
          endAt: endAt.toISOString(),
        });

        if (!availability.isAvailable) {
          // Filter out the current booking from conflicting bookings
          const otherConflicts = availability.conflictingBookings?.filter(
            b => b.id !== id
          );
          if (otherConflicts && otherConflicts.length > 0) {
            throw new ConflictException('Vehicle is not available for the selected time period');
          }
        }
      }
    }

    const updatedBooking = await this.prisma.booking.update({
      where: { id },
      data: {
        ...updateBookingDto,
        ...(updateBookingDto.startAt && { startAt: new Date(updateBookingDto.startAt) }),
        ...(updateBookingDto.endAt && { endAt: new Date(updateBookingDto.endAt) }),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        vehicle: true,
      },
    });

    this.logger.log(`Booking updated: ${id}`);

    return updatedBooking;
  }

  async remove(id: string, currentUser: any): Promise<void> {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Check permissions
    if (currentUser.role === Role.CUSTOMER) {
      if (booking.userId !== currentUser.id) {
        throw new ForbiddenException('You can only cancel your own bookings');
      }
      // Only allow cancellation if booking is pending or confirmed
      if (![BookingStatus.PENDING, BookingStatus.CONFIRMED].includes(booking.status)) {
        throw new BadRequestException('Cannot cancel booking in current status');
      }
    }

    // Soft delete by updating status to cancelled
    await this.prisma.booking.update({
      where: { id },
      data: { status: BookingStatus.CANCELED },
    });

    this.logger.log(`Booking cancelled: ${id}`);
  }

  async checkAvailability(checkAvailabilityDto: CheckAvailabilityDto): Promise<AvailabilityResponseDto> {
    const { vehicleId, startAt, endAt } = checkAvailabilityDto;

    const startDate = new Date(startAt);
    const endDate = new Date(endAt);

    // Find conflicting bookings
    const conflictingBookings = await this.prisma.booking.findMany({
      where: {
        vehicleId,
        status: {
          in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
        },
        OR: [
          {
            startAt: {
              lte: endDate,
            },
            endAt: {
              gte: startDate,
            },
          },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        vehicle: true,
      },
    });

    const isAvailable = conflictingBookings.length === 0;

    return {
      isAvailable,
      conflictingBookings: isAvailable ? [] : conflictingBookings,
      message: isAvailable
        ? 'Vehicle is available for the selected time period'
        : `Vehicle is not available. Found ${conflictingBookings.length} conflicting booking(s)`,
    };
  }

  async getStats(currentUser: any): Promise<BookingStatsDto> {
    let where: any = {};

    if (currentUser.role === Role.CUSTOMER) {
      where.userId = currentUser.id;
    }

    const [total, pending, confirmed, completed, cancelled] = await Promise.all([
      this.prisma.booking.count({ where }),
      this.prisma.booking.count({ where: { ...where, status: BookingStatus.PENDING } }),
      this.prisma.booking.count({ where: { ...where, status: BookingStatus.CONFIRMED } }),
      this.prisma.booking.count({ where: { ...where, status: BookingStatus.COMPLETED } }),
      this.prisma.booking.count({ where: { ...where, status: BookingStatus.CANCELED } }),
    ]);

    return {
      total,
      pending,
      confirmed,
      completed,
      cancelled,
    };
  }

  async confirmBooking(id: string, currentUser: any): Promise<BookingResponseDto> {
    // Only ADMIN and STAFF can confirm bookings
    if (currentUser.role === Role.CUSTOMER) {
      throw new ForbiddenException('Only staff and admin can confirm bookings');
    }

    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.status !== BookingStatus.PENDING) {
      throw new BadRequestException('Only pending bookings can be confirmed');
    }

    const updatedBooking = await this.prisma.booking.update({
      where: { id },
      data: { status: BookingStatus.CONFIRMED },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        vehicle: true,
      },
    });

    this.logger.log(`Booking confirmed: ${id}`);

    return updatedBooking;
  }

  async completeBooking(id: string, currentUser: any): Promise<BookingResponseDto> {
    // Only ADMIN and STAFF can complete bookings
    if (currentUser.role === Role.CUSTOMER) {
      throw new ForbiddenException('Only staff and admin can complete bookings');
    }

    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.status !== BookingStatus.CONFIRMED) {
      throw new BadRequestException('Only confirmed bookings can be completed');
    }

    const updatedBooking = await this.prisma.booking.update({
      where: { id },
      data: { status: BookingStatus.COMPLETED },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        vehicle: true,
      },
    });

    this.logger.log(`Booking completed: ${id}`);

    return updatedBooking;
  }
}