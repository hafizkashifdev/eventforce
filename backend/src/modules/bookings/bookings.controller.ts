import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, UpdateBookingDto, CheckAvailabilityDto, BookingQueryDto } from './dto/create-booking.dto';
import { BookingResponseDto, AvailabilityResponseDto, BookingStatsDto } from './dto/booking-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@ApiTags('Bookings')
@Controller('bookings')
@UseGuards(ThrottlerGuard, JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({ status: 201, description: 'Booking created successfully', type: BookingResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Vehicle not available' })
  async create(
    @Body() createBookingDto: CreateBookingDto,
    @CurrentUser() user: any,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.create(createBookingDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bookings with pagination and filters' })
  @ApiResponse({ status: 200, description: 'Bookings retrieved successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiQuery({ name: 'status', required: false, enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'IN_PROGRESS'] })
  @ApiQuery({ name: 'userId', required: false, type: String, description: 'Filter by user ID (Admin/Staff only)' })
  @ApiQuery({ name: 'vehicleId', required: false, type: String, description: 'Filter by vehicle ID' })
  async findAll(
    @Query() query: BookingQueryDto,
    @CurrentUser() user: any,
  ) {
    return this.bookingsService.findAll(query, user);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get booking statistics' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully', type: BookingStatsDto })
  async getStats(@CurrentUser() user: any): Promise<BookingStatsDto> {
    return this.bookingsService.getStats(user);
  }

  @Get('availability')
  @ApiOperation({ summary: 'Check vehicle availability' })
  @ApiResponse({ status: 200, description: 'Availability checked successfully', type: AvailabilityResponseDto })
  async checkAvailability(@Query() checkAvailabilityDto: CheckAvailabilityDto): Promise<AvailabilityResponseDto> {
    return this.bookingsService.checkAvailability(checkAvailabilityDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking by ID' })
  @ApiResponse({ status: 200, description: 'Booking retrieved successfully', type: BookingResponseDto })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  @ApiParam({ name: 'id', description: 'Booking ID' })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.findOne(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update booking' })
  @ApiResponse({ status: 200, description: 'Booking updated successfully', type: BookingResponseDto })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiParam({ name: 'id', description: 'Booking ID' })
  async update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
    @CurrentUser() user: any,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.update(id, updateBookingDto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Cancel booking' })
  @ApiResponse({ status: 204, description: 'Booking cancelled successfully' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiParam({ name: 'id', description: 'Booking ID' })
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ): Promise<void> {
    return this.bookingsService.remove(id, user);
  }

  @Post(':id/confirm')
  @UseGuards(RolesGuard)
  @Roles(Role.STAFF, Role.ADMIN)
  @ApiOperation({ summary: 'Confirm booking (Staff/Admin only)' })
  @ApiResponse({ status: 200, description: 'Booking confirmed successfully', type: BookingResponseDto })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiParam({ name: 'id', description: 'Booking ID' })
  async confirmBooking(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.confirmBooking(id, user);
  }

  @Post(':id/complete')
  @UseGuards(RolesGuard)
  @Roles(Role.STAFF, Role.ADMIN)
  @ApiOperation({ summary: 'Complete booking (Staff/Admin only)' })
  @ApiResponse({ status: 200, description: 'Booking completed successfully', type: BookingResponseDto })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiParam({ name: 'id', description: 'Booking ID' })
  async completeBooking(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.completeBooking(id, user);
  }
}
