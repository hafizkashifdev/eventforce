import {
  Controller,
  Get,
  Post,
  Body,
  Param,
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
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto, SendBulkNotificationDto, NotificationQueryDto } from './dto/create-notification.dto';
import { NotificationResponseDto, NotificationStatsDto } from './dto/notification-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(ThrottlerGuard, JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.STAFF, Role.ADMIN)
  @ApiOperation({ summary: 'Create a new notification (Staff/Admin only)' })
  @ApiResponse({ status: 201, description: 'Notification created successfully', type: NotificationResponseDto })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async create(
    @Body() createNotificationDto: CreateNotificationDto,
    @CurrentUser() user: any,
  ): Promise<NotificationResponseDto> {
    return this.notificationsService.create(createNotificationDto, user);
  }

  @Post('bulk')
  @UseGuards(RolesGuard)
  @Roles(Role.STAFF, Role.ADMIN)
  @ApiOperation({ summary: 'Send bulk notifications (Staff/Admin only)' })
  @ApiResponse({ status: 201, description: 'Bulk notifications created successfully', type: [NotificationResponseDto] })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async sendBulk(
    @Body() sendBulkNotificationDto: SendBulkNotificationDto,
    @CurrentUser() user: any,
  ): Promise<NotificationResponseDto[]> {
    return this.notificationsService.sendBulk(sendBulkNotificationDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notifications with pagination and filters' })
  @ApiResponse({ status: 200, description: 'Notifications retrieved successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiQuery({ name: 'userId', required: false, type: String, description: 'Filter by user ID (Admin/Staff only)' })
  @ApiQuery({ name: 'bookingId', required: false, type: String, description: 'Filter by booking ID' })
  @ApiQuery({ name: 'type', required: false, enum: ['EMAIL', 'SMS', 'PUSH', 'WHATSAPP'], description: 'Filter by notification type' })
  async findAll(
    @Query() query: NotificationQueryDto,
    @CurrentUser() user: any,
  ) {
    return this.notificationsService.findAll(query, user);
  }

  @Get('stats')
  @UseGuards(RolesGuard)
  @Roles(Role.STAFF, Role.ADMIN)
  @ApiOperation({ summary: 'Get notification statistics (Staff/Admin only)' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully', type: NotificationStatsDto })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getStats(@CurrentUser() user: any): Promise<NotificationStatsDto> {
    return this.notificationsService.getStats(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notification by ID' })
  @ApiResponse({ status: 200, description: 'Notification retrieved successfully', type: NotificationResponseDto })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ): Promise<NotificationResponseDto> {
    return this.notificationsService.findOne(id, user);
  }

  @Post(':id/read')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiResponse({ status: 200, description: 'Notification marked as read', type: NotificationResponseDto })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  async markAsRead(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ): Promise<NotificationResponseDto> {
    return this.notificationsService.markAsRead(id, user);
  }

  @Post('read-all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark all notifications as read' })
  @ApiResponse({ status: 200, description: 'All notifications marked as read' })
  async markAllAsRead(@CurrentUser() user: any): Promise<{ count: number }> {
    return this.notificationsService.markAllAsRead(user);
  }
}
