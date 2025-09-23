import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(ThrottlerGuard, JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.STAFF)
@ApiBearerAuth('JWT-auth')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get dashboard metrics (Admin/Staff only)' })
  @ApiResponse({ status: 200, description: 'Dashboard metrics retrieved successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getDashboardMetrics(@CurrentUser() user: any) {
    return this.adminService.getDashboardMetrics(user);
  }

  @Get('users/stats')
  @ApiOperation({ summary: 'Get user statistics (Admin/Staff only)' })
  @ApiResponse({ status: 200, description: 'User statistics retrieved successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getUsersStats(@CurrentUser() user: any) {
    return this.adminService.getUsersStats(user);
  }

  @Get('bookings/stats')
  @ApiOperation({ summary: 'Get booking statistics (Admin/Staff only)' })
  @ApiResponse({ status: 200, description: 'Booking statistics retrieved successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getBookingsStats(@CurrentUser() user: any) {
    return this.adminService.getBookingsStats(user);
  }

  @Get('payments/stats')
  @ApiOperation({ summary: 'Get payment statistics (Admin/Staff only)' })
  @ApiResponse({ status: 200, description: 'Payment statistics retrieved successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getPaymentsStats(@CurrentUser() user: any) {
    return this.adminService.getPaymentsStats(user);
  }
}