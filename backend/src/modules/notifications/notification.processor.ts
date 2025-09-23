import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { NotificationsService } from './notifications.service';
import { NotificationType } from '@prisma/client';

export interface NotificationJobData {
  notificationId: string;
  type: NotificationType;
  userId?: string;
  bookingId?: string;
  subject?: string;
  content: string;
  templateId?: string;
  metadata?: any;
}

@Processor('notifications')
export class NotificationProcessor {
  private readonly logger = new Logger(NotificationProcessor.name);

  constructor(private readonly notificationsService: NotificationsService) {}

  @Process('email')
  async handleEmailNotification(job: Job<NotificationJobData>) {
    const { notificationId, userId, subject, content, templateId, metadata } = job.data;

    try {
      this.logger.log(`Processing email notification: ${notificationId}`);

      // Get user details if userId is provided
      let userEmail: string | undefined;
      if (userId) {
        const user = await this.notificationsService.getUserById(userId);
        userEmail = user?.email;
      }

      if (!userEmail) {
        throw new Error('User email not found');
      }

      // Send email using your email service (SendGrid, Nodemailer, etc.)
      await this.notificationsService.sendEmail({
        to: userEmail,
        subject: subject || 'Event Force Notification',
        content,
        templateId,
        metadata,
      });

      // Update notification status
      await this.notificationsService.updateNotificationStatus(notificationId, 'SENT');

      this.logger.log(`Email notification sent successfully: ${notificationId}`);
    } catch (error) {
      this.logger.error(`Failed to send email notification: ${notificationId}`, error.stack);
      
      // Update notification status to failed
      await this.notificationsService.updateNotificationStatus(notificationId, 'FAILED', error.message);
      
      // Retry logic
      if (job.attemptsMade < 3) {
        throw error; // This will trigger a retry
      }
    }
  }

  @Process('sms')
  async handleSmsNotification(job: Job<NotificationJobData>) {
    const { notificationId, userId, content, metadata } = job.data;

    try {
      this.logger.log(`Processing SMS notification: ${notificationId}`);

      // Get user details if userId is provided
      let userPhone: string | undefined;
      if (userId) {
        const user = await this.notificationsService.getUserById(userId);
        userPhone = user?.phone;
      }

      if (!userPhone) {
        throw new Error('User phone number not found');
      }

      // Send SMS using your SMS service (Twilio, etc.)
      await this.notificationsService.sendSms({
        to: userPhone,
        content,
        metadata,
      });

      // Update notification status
      await this.notificationsService.updateNotificationStatus(notificationId, 'SENT');

      this.logger.log(`SMS notification sent successfully: ${notificationId}`);
    } catch (error) {
      this.logger.error(`Failed to send SMS notification: ${notificationId}`, error.stack);
      
      // Update notification status to failed
      await this.notificationsService.updateNotificationStatus(notificationId, 'FAILED', error.message);
      
      // Retry logic
      if (job.attemptsMade < 3) {
        throw error; // This will trigger a retry
      }
    }
  }

  @Process('push')
  async handlePushNotification(job: Job<NotificationJobData>) {
    const { notificationId, userId, subject, content, metadata } = job.data;

    try {
      this.logger.log(`Processing push notification: ${notificationId}`);

      // Get user details if userId is provided
      let userPushToken: string | undefined;
      if (userId) {
        const user = await this.notificationsService.getUserById(userId);
        userPushToken = user?.pushToken; // Assuming you have pushToken field
      }

      if (!userPushToken) {
        throw new Error('User push token not found');
      }

      // Send push notification using your push service (FCM, etc.)
      await this.notificationsService.sendPushNotification({
        to: userPushToken,
        title: subject || 'Event Force Notification',
        body: content,
        metadata,
      });

      // Update notification status
      await this.notificationsService.updateNotificationStatus(notificationId, 'SENT');

      this.logger.log(`Push notification sent successfully: ${notificationId}`);
    } catch (error) {
      this.logger.error(`Failed to send push notification: ${notificationId}`, error.stack);
      
      // Update notification status to failed
      await this.notificationsService.updateNotificationStatus(notificationId, 'FAILED', error.message);
      
      // Retry logic
      if (job.attemptsMade < 3) {
        throw error; // This will trigger a retry
      }
    }
  }

  @Process('whatsapp')
  async handleWhatsAppNotification(job: Job<NotificationJobData>) {
    const { notificationId, userId, content, metadata } = job.data;

    try {
      this.logger.log(`Processing WhatsApp notification: ${notificationId}`);

      // Get user details if userId is provided
      let userPhone: string | undefined;
      if (userId) {
        const user = await this.notificationsService.getUserById(userId);
        userPhone = user?.phone;
      }

      if (!userPhone) {
        throw new Error('User phone number not found');
      }

      // Send WhatsApp message using your WhatsApp service (Twilio WhatsApp API, etc.)
      await this.notificationsService.sendWhatsApp({
        to: userPhone,
        content,
        metadata,
      });

      // Update notification status
      await this.notificationsService.updateNotificationStatus(notificationId, 'SENT');

      this.logger.log(`WhatsApp notification sent successfully: ${notificationId}`);
    } catch (error) {
      this.logger.error(`Failed to send WhatsApp notification: ${notificationId}`, error.stack);
      
      // Update notification status to failed
      await this.notificationsService.updateNotificationStatus(notificationId, 'FAILED', error.message);
      
      // Retry logic
      if (job.attemptsMade < 3) {
        throw error; // This will trigger a retry
      }
    }
  }
}
