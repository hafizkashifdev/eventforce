import { IsString, IsDateString, IsOptional, IsInt, Min, IsUUID, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BookingStatus } from '@prisma/client';

export class CreateBookingDto {
  @ApiProperty({ description: 'Vehicle ID for the booking' })
  @IsUUID()
  vehicleId: string;

  @ApiProperty({ description: 'Start date and time of the booking', example: '2024-12-25T10:00:00Z' })
  @IsDateString()
  startAt: string;

  @ApiProperty({ description: 'End date and time of the booking', example: '2024-12-25T12:00:00Z' })
  @IsDateString()
  endAt: string;
}

export class UpdateBookingDto {
  @ApiPropertyOptional({ description: 'Vehicle ID for the booking' })
  @IsOptional()
  @IsUUID()
  vehicleId?: string;

  @ApiPropertyOptional({ description: 'Start date and time of the booking' })
  @IsOptional()
  @IsDateString()
  startAt?: string;

  @ApiPropertyOptional({ description: 'End date and time of the booking' })
  @IsOptional()
  @IsDateString()
  endAt?: string;

  @ApiPropertyOptional({ description: 'Booking status' })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;
}

export class CheckAvailabilityDto {
  @ApiProperty({ description: 'Vehicle ID to check availability for' })
  @IsUUID()
  vehicleId: string;

  @ApiProperty({ description: 'Start date and time', example: '2024-12-25T10:00:00Z' })
  @IsDateString()
  startAt: string;

  @ApiProperty({ description: 'End date and time', example: '2024-12-25T12:00:00Z' })
  @IsDateString()
  endAt: string;
}

export class BookingQueryDto {
  @ApiPropertyOptional({ description: 'Page number', default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Number of items per page', default: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Filter by status' })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @ApiPropertyOptional({ description: 'Filter by user ID' })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({ description: 'Filter by vehicle ID' })
  @IsOptional()
  @IsUUID()
  vehicleId?: string;
}