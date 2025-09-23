import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateNotificationDto, SendBulkNotificationDto, NotificationQueryDto } from './dto/create-notification.dto';
import { NotificationResponseDto, NotificationStatsDto } from './dto/notification-response.dto';
import { NotificationType, NotificationStatus, Role } from '@prisma/client';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue('notifications') private readonly notificationQueue: Queue,
  ) {}

  async create(createNotificationDto: CreateNotificationDto, currentUser: any): Promise<NotificationResponseDto> {
    // Only ADMIN and STAFF can create notifications
    if (currentUser.role === Role.CUSTOMER) {
      throw new ForbiddenException('Only staff and admin can create notifications');
    }

    const notification = await this.prisma.notification.create({
      data: createNotificationDto,
    });

    // Queue the notification for processing
    await this.queueNotification(notification);

    this.logger.log(`Notification created: ${notification.id}`);

    return notification;
  }

  async sendBulk(sendBulkNotificationDto: SendBulkNotificationDto, currentUser: any): Promise<NotificationResponseDto[]> {
    // Only ADMIN and STAFF can send bulk notifications
    if (currentUser.role === Role.CUSTOMER) {
      throw new ForbiddenException('Only staff and admin can send bulk notifications');
    }

    const { userIds, type, subject, content, templateId, metadata } = sendBulkNotificationDto;

    const notifications = await Promise.all(
      userIds.map(userId =>
        this.prisma.notification.create({
          data: {
            userId,
            type,
            subject,
            content,
            templateId,
            metadata,
          },
        })
      )
    );

    // Queue all notifications for processing
    await Promise.all(notifications.map(notification => this.queueNotification(notification)));

    this.logger.log(`Bulk notifications created: ${notifications.length} notifications`);

    return notifications;
  }

  async findAll(query: NotificationQueryDto, currentUser: any): Promise<{ notifications: NotificationResponseDto[]; total: number; page: number; limit: number }> {
    const { page = 1, limit = 10, userId, bookingId, type } = query;
    const skip = (page - 1) * limit;

    // Build where clause based on user role
    let where: any = {};

    if (currentUser.role === Role.CUSTOMER) {
      // Customers can only see their own notifications
      where.userId = currentUser.id;
    } else if (currentUser.role === Role.STAFF) {
      // Staff can see notifications but with limited access
      where = {};
    }
    // ADMIN can see all notifications (no additional where clause)

    if (userId && (currentUser.role === Role.ADMIN || currentUser.role === Role.STAFF)) {
      where.userId = userId;
    }

    if (bookingId) {
      where.bookingId = bookingId;
    }

    if (type) {
      where.type = type;
    }

    const [notifications, total] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.notification.count({ where }),
    ]);

    return {
      notifications,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string, currentUser: any): Promise<NotificationResponseDto> {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    // Check permissions
    if (currentUser.role === Role.CUSTOMER && notification.userId !== currentUser.id) {
      throw new ForbiddenException('You can only view your own notifications');
    }

    return notification;
  }

  async getStats(currentUser: any): Promise<NotificationStatsDto> {
    // Only ADMIN and STAFF can view notification stats
    if (currentUser.role === Role.CUSTOMER) {
      throw new ForbiddenException('Only staff and admin can view notification statistics');
    }

    let where: any = {};

    if (currentUser.role === Role.STAFF) {
      // Staff might have limited access to stats
      where = {};
    }

    const [total, notifications, byType, byStatus] = await Promise.all([
      this.prisma.notification.count({ where }),
      this.prisma.notification.findMany({
        where,
        select: { type: true, status: true },
      }),
      this.prisma.notification.groupBy({
        by: ['type'],
        where,
        _count: { type: true },
      }),
      this.prisma.notification.groupBy({
        by: ['status'],
        where,
        _count: { status: true },
      }),
    ]);

    const sent = notifications.filter(n => n.status === NotificationStatus.SENT).length;
    const pending = notifications.filter(n => n.status === NotificationStatus.PENDING).length;
    const failed = notifications.filter(n => n.status === NotificationStatus.FAILED).length;
    const delivered = notifications.filter(n => n.status === NotificationStatus.DELIVERED).length;

    return {
      total,
      sent,
      pending,
      failed,
      delivered,
      byType: byType.reduce((acc, item) => {
        acc[item.type] = item._count.type;
        return acc;
      }, {} as Record<string, number>),
      byStatus: byStatus.reduce((acc, item) => {
        acc[item.status] = item._count.status;
        return acc;
      }, {} as Record<string, number>),
    };
  }

  async markAsRead(id: string, currentUser: any): Promise<NotificationResponseDto> {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    // Check permissions
    if (currentUser.role === Role.CUSTOMER && notification.userId !== currentUser.id) {
      throw new ForbiddenException('You can only mark your own notifications as read');
    }

    // Update notification metadata to mark as read
    const updatedNotification = await this.prisma.notification.update({
      where: { id },
      data: {
        metadata: {
          ...notification.metadata,
          readAt: new Date().toISOString(),
          readBy: currentUser.id,
        },
      },
    });

    return updatedNotification;
  }

  async markAllAsRead(currentUser: any): Promise<{ count: number }> {
    const result = await this.prisma.notification.updateMany({
      where: {
        userId: currentUser.id,
        metadata: {
          path: ['readAt'],
          equals: null,
        },
      },
      data: {
        metadata: {
          readAt: new Date().toISOString(),
          readBy: currentUser.id,
        },
      },
    });

    return { count: result.count };
  }

  // Booking-specific notification methods
  async sendBookingConfirmation(booking: any): Promise<void> {
    const notification = await this.prisma.notification.create({
      data: {
        userId: booking.userId,
        bookingId: booking.id,
        type: NotificationType.EMAIL,
        subject: 'Booking Confirmation - Event Force',
        content: `Your booking has been confirmed. Booking ID: ${booking.id}. Vehicle: ${booking.vehicle?.name}. Pickup: ${booking.pickupLocation} at ${booking.startAt}.`,
        templateId: 'booking_confirmation',
        metadata: {
          bookingId: booking.id,
          vehicleName: booking.vehicle?.name,
          pickupLocation: booking.pickupLocation,
          startAt: booking.startAt,
        },
      },
    });

    await this.queueNotification(notification);
  }

  async sendBookingStatusUpdate(booking: any): Promise<void> {
    const statusMessages = {
      PENDING: 'Your booking is pending confirmation.',
      CONFIRMED: 'Your booking has been confirmed.',
      CANCELLED: 'Your booking has been cancelled.',
      COMPLETED: 'Your booking has been completed.',
      IN_PROGRESS: 'Your booking is in progress.',
    };

    const notification = await this.prisma.notification.create({
      data: {
        userId: booking.userId,
        bookingId: booking.id,
        type: NotificationType.EMAIL,
        subject: `Booking Status Update - ${booking.status}`,
        content: `${statusMessages[booking.status]} Booking ID: ${booking.id}.`,
        templateId: 'booking_status_update',
        metadata: {
          bookingId: booking.id,
          status: booking.status,
        },
      },
    });

    await this.queueNotification(notification);
  }

  async sendBookingCancellation(booking: any): Promise<void> {
    const notification = await this.prisma.notification.create({
      data: {
        userId: booking.userId,
        bookingId: booking.id,
        type: NotificationType.EMAIL,
        subject: 'Booking Cancelled - Event Force',
        content: `Your booking has been cancelled. Booking ID: ${booking.id}. Refund will be processed within 3-5 business days.`,
        templateId: 'booking_cancellation',
        metadata: {
          bookingId: booking.id,
        },
      },
    });

    await this.queueNotification(notification);
  }

  async sendBookingCompletion(booking: any): Promise<void> {
    const notification = await this.prisma.notification.create({
      data: {
        userId: booking.userId,
        bookingId: booking.id,
        type: NotificationType.EMAIL,
        subject: 'Booking Completed - Event Force',
        content: `Your booking has been completed. Booking ID: ${booking.id}. Thank you for choosing Event Force!`,
        templateId: 'booking_completion',
        metadata: {
          bookingId: booking.id,
        },
      },
    });

    await this.queueNotification(notification);
  }

  async sendPaymentConfirmation(booking: any, payment: any): Promise<void> {
    const notification = await this.prisma.notification.create({
      data: {
        userId: booking.userId,
        bookingId: booking.id,
        type: NotificationType.EMAIL,
        subject: 'Payment Confirmation - Event Force',
        content: `Your payment has been processed successfully. Amount: ${payment.amountCents / 100} ${payment.currency}. Payment ID: ${payment.id}.`,
        templateId: 'payment_confirmation',
        metadata: {
          bookingId: booking.id,
          paymentId: payment.id,
          amount: payment.amountCents,
          currency: payment.currency,
        },
      },
    });

    await this.queueNotification(notification);
  }

  // Helper methods for external services
  async getUserById(userId: string): Promise<any> {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        phone: true,
        firstName: true,
        lastName: true,
      },
    });
  }

  async updateNotificationStatus(notificationId: string, status: NotificationStatus, errorMessage?: string): Promise<void> {
    const updateData: any = {
      status,
      retryCount: { increment: 1 },
    };

    if (status === NotificationStatus.SENT) {
      updateData.sentAt = new Date();
    } else if (status === NotificationStatus.FAILED) {
      updateData.failedAt = new Date();
      updateData.errorMessage = errorMessage;
    }

    await this.prisma.notification.update({
      where: { id: notificationId },
      data: updateData,
    });
  }

  private async queueNotification(notification: any): Promise<void> {
    const jobData = {
      notificationId: notification.id,
      type: notification.type,
      userId: notification.userId,
      bookingId: notification.bookingId,
      subject: notification.subject,
      content: notification.content,
      templateId: notification.templateId,
      metadata: notification.metadata,
    };

    await this.notificationQueue.add(notification.type.toLowerCase(), jobData, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
      removeOnComplete: 10,
      removeOnFail: 5,
    });
  }

  // External service integration methods (implement based on your email/SMS providers)
  async sendEmail(data: { to: string; subject: string; content: string; templateId?: string; metadata?: any }): Promise<void> {
    // Implement email sending logic here (SendGrid, Nodemailer, etc.)
    this.logger.log(`Sending email to ${data.to}: ${data.subject}`);
    // Example implementation:
    // await this.emailService.send(data);
  }

  async sendSms(data: { to: string; content: string; metadata?: any }): Promise<void> {
    // Implement SMS sending logic here (Twilio, etc.)
    this.logger.log(`Sending SMS to ${data.to}: ${data.content}`);
    // Example implementation:
    // await this.smsService.send(data);
  }

  async sendPushNotification(data: { to: string; title: string; body: string; metadata?: any }): Promise<void> {
    // Implement push notification logic here (FCM, etc.)
    this.logger.log(`Sending push notification to ${data.to}: ${data.title}`);
    // Example implementation:
    // await this.pushService.send(data);
  }

  async sendWhatsApp(data: { to: string; content: string; metadata?: any }): Promise<void> {
    // Implement WhatsApp sending logic here (Twilio WhatsApp API, etc.)
    this.logger.log(`Sending WhatsApp to ${data.to}: ${data.content}`);
    // Example implementation:
    // await this.whatsappService.send(data);
  }
}
