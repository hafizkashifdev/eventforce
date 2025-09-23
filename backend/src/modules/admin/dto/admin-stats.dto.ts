import { ApiProperty } from '@nestjs/swagger';

export class UserStatsDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  customers: number;

  @ApiProperty()
  staff: number;

  @ApiProperty()
  admins: number;

  @ApiProperty()
  active: number;

  @ApiProperty()
  inactive: number;

  @ApiProperty()
  verified: number;

  @ApiProperty()
  unverified: number;
}

export class BookingStatsDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  pending: number;

  @ApiProperty()
  confirmed: number;

  @ApiProperty()
  completed: number;

  @ApiProperty()
  cancelled: number;

  @ApiProperty()
  inProgress: number;

  @ApiProperty()
  totalRevenue: number;

  @ApiProperty()
  averageBookingValue: number;
}

export class VehicleStatsDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  active: number;

  @ApiProperty()
  inactive: number;

  @ApiProperty()
  byType: Record<string, number>;

  @ApiProperty()
  byBranch: Record<string, number>;
}

export class PaymentStatsDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty()
  succeeded: number;

  @ApiProperty()
  pending: number;

  @ApiProperty()
  failed: number;

  @ApiProperty()
  refunded: number;

  @ApiProperty()
  byProvider: Record<string, number>;
}

export class NotificationStatsDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  sent: number;

  @ApiProperty()
  pending: number;

  @ApiProperty()
  failed: number;

  @ApiProperty()
  byType: Record<string, number>;
}

export class DashboardStatsDto {
  @ApiProperty({ type: UserStatsDto })
  users: UserStatsDto;

  @ApiProperty({ type: BookingStatsDto })
  bookings: BookingStatsDto;

  @ApiProperty({ type: VehicleStatsDto })
  vehicles: VehicleStatsDto;

  @ApiProperty({ type: PaymentStatsDto })
  payments: PaymentStatsDto;

  @ApiProperty({ type: NotificationStatsDto })
  notifications: NotificationStatsDto;

  @ApiProperty()
  recentActivity: any[];

  @ApiProperty()
  topVehicles: any[];

  @ApiProperty()
  revenueByMonth: Record<string, number>;
}
