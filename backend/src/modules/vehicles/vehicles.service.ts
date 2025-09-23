import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateVehicleDto, UpdateVehicleDto, VehicleQueryDto } from './dto/create-vehicle.dto';
import { VehicleResponseDto } from './dto/vehicle-response.dto';
import { Role } from '@prisma/client';

@Injectable()
export class VehiclesService {
  private readonly logger = new Logger(VehiclesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createVehicleDto: CreateVehicleDto, currentUser: any): Promise<VehicleResponseDto> {
    // Only ADMIN and STAFF can create vehicles
    if (currentUser.role === Role.CUSTOMER) {
      throw new ForbiddenException('Only staff and admin can create vehicles');
    }

    const vehicle = await this.prisma.vehicle.create({
      data: createVehicleDto,
    });

    this.logger.log(`Vehicle created: ${vehicle.id} by user ${currentUser.id}`);

    return vehicle;
  }

  async findAll(query: VehicleQueryDto, currentUser: any): Promise<{ vehicles: VehicleResponseDto[]; total: number; page: number; limit: number }> {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [vehicles, total] = await Promise.all([
      this.prisma.vehicle.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.vehicle.count({ where }),
    ]);

    return {
      vehicles,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string, currentUser: any): Promise<VehicleResponseDto> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    return vehicle;
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto, currentUser: any): Promise<VehicleResponseDto> {
    // Only ADMIN and STAFF can update vehicles
    if (currentUser.role === Role.CUSTOMER) {
      throw new ForbiddenException('Only staff and admin can update vehicles');
    }

    const existingVehicle = await this.prisma.vehicle.findUnique({
      where: { id },
    });

    if (!existingVehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    const vehicle = await this.prisma.vehicle.update({
      where: { id },
      data: updateVehicleDto,
    });

    this.logger.log(`Vehicle updated: ${id} by user ${currentUser.id}`);

    return vehicle;
  }

  async remove(id: string, currentUser: any): Promise<void> {
    // Only ADMIN can delete vehicles
    if (currentUser.role !== Role.ADMIN) {
      throw new ForbiddenException('Only admin can delete vehicles');
    }

    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    // Check if vehicle has active bookings
    const activeBookings = await this.prisma.booking.count({
      where: {
        vehicleId: id,
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
    });

    if (activeBookings > 0) {
      throw new BadRequestException('Cannot delete vehicle with active bookings');
    }

    await this.prisma.vehicle.delete({
      where: { id },
    });

    this.logger.log(`Vehicle deleted: ${id} by user ${currentUser.id}`);
  }
}