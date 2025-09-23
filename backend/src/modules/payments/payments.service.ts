import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreatePaymentIntentDto, ProcessPaymentDto, RefundPaymentDto, PaymentQueryDto } from './dto/create-payment.dto';
import { PaymentResponseDto, PaymentIntentResponseDto, PaymentStatsDto } from './dto/payment-response.dto';
import { Role } from '@prisma/client';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private readonly stripe: Stripe;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-10-16',
    });
  }

  async createPaymentIntent(createPaymentIntentDto: CreatePaymentIntentDto, userId: string): Promise<PaymentIntentResponseDto> {
    const { bookingId } = createPaymentIntentDto;

    // Get booking details
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { user: true, vehicle: true },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.userId !== userId) {
      throw new ForbiddenException('You can only create payments for your own bookings');
    }

    if (booking.status !== 'PENDING' && booking.status !== 'CONFIRMED') {
      throw new BadRequestException('Cannot create payment for booking in current status');
    }

    // Check if payment already exists
    const existingPayment = await this.prisma.payment.findFirst({
      where: {
        bookingId,
        status: { in: ['pending', 'processing', 'succeeded'] },
      },
    });

    if (existingPayment) {
      throw new BadRequestException('Payment already exists for this booking');
    }

    return this.createStripePaymentIntent(booking);
  }

  private async createStripePaymentIntent(booking: any): Promise<PaymentIntentResponseDto> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: booking.totalCents,
        currency: 'usd',
        metadata: {
          bookingId: booking.id,
          userId: booking.userId,
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      // Create payment record
      await this.prisma.payment.create({
        data: {
          bookingId: booking.id,
          amountCents: booking.totalCents,
          currency: 'usd',
          stripePaymentIntent: paymentIntent.id,
          status: 'pending',
        },
      });

      this.logger.log(`Stripe payment intent created: ${paymentIntent.id} for booking ${booking.id}`);

      return {
        clientSecret: paymentIntent.client_secret!,
        paymentIntentId: paymentIntent.id,
        amount: booking.totalCents,
        currency: 'usd',
        status: paymentIntent.status,
      };
    } catch (error) {
      this.logger.error(`Failed to create Stripe payment intent: ${error.message}`);
      throw new BadRequestException('Failed to create payment intent');
    }
  }

  async processPayment(processPaymentDto: ProcessPaymentDto, userId: string): Promise<PaymentResponseDto> {
    const { paymentIntentId, bookingId } = processPaymentDto;

    // Get payment record
    const payment = await this.prisma.payment.findFirst({
      where: {
        stripePaymentIntent: paymentIntentId,
        bookingId,
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return this.processStripePayment(payment);
  }

  private async processStripePayment(payment: any): Promise<PaymentResponseDto> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(payment.stripePaymentIntent);

      let status: string;
      if (paymentIntent.status === 'succeeded') {
        status = 'succeeded';
      } else if (paymentIntent.status === 'requires_payment_method') {
        status = 'failed';
      } else {
        status = 'processing';
      }

      const updatedPayment = await this.prisma.payment.update({
        where: { id: payment.id },
        data: { status },
      });

      // If payment succeeded, update booking status
      if (status === 'succeeded') {
        await this.prisma.booking.update({
          where: { id: payment.bookingId },
          data: { status: 'CONFIRMED' },
        });
      }

      this.logger.log(`Stripe payment processed: ${payment.id} with status ${status}`);

      return updatedPayment;
    } catch (error) {
      this.logger.error(`Failed to process Stripe payment: ${error.message}`);
      throw new BadRequestException('Failed to process payment');
    }
  }

  async findAll(query: PaymentQueryDto, currentUser: any): Promise<{ payments: PaymentResponseDto[]; total: number; page: number; limit: number }> {
    const { page = 1, limit = 10, bookingId, userId } = query;
    const skip = (page - 1) * limit;

    // Build where clause based on user role
    let where: any = {};

    if (currentUser.role === Role.CUSTOMER) {
      // Customers can only see their own payments
      where.bookingId = {
        in: await this.prisma.booking.findMany({
          where: { userId: currentUser.id },
          select: { id: true },
        }).then(bookings => bookings.map(b => b.id)),
      };
    } else if (currentUser.role === Role.STAFF) {
      // Staff can see payments but with limited access
      where = {};
    }
    // ADMIN can see all payments (no additional where clause)

    if (bookingId) {
      where.bookingId = bookingId;
    }

    const [payments, total] = await Promise.all([
      this.prisma.payment.findMany({
        where,
        skip,
        take: limit,
        include: {
          booking: {
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
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.payment.count({ where }),
    ]);

    return {
      payments,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string, currentUser: any): Promise<PaymentResponseDto> {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: {
        booking: {
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
        },
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    // Check permissions
    if (currentUser.role === Role.CUSTOMER) {
      const booking = await this.prisma.booking.findUnique({
        where: { id: payment.bookingId },
      });
      if (booking && booking.userId !== currentUser.id) {
        throw new ForbiddenException('You can only view your own payments');
      }
    }

    return payment;
  }

  async refundPayment(refundPaymentDto: RefundPaymentDto, currentUser: any): Promise<PaymentResponseDto> {
    // Only ADMIN and STAFF can process refunds
    if (currentUser.role === Role.CUSTOMER) {
      throw new ForbiddenException('Only staff and admin can process refunds');
    }

    const { paymentId, refundAmountCents, refundReason } = refundPaymentDto;

    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (payment.status !== 'succeeded') {
      throw new BadRequestException('Only succeeded payments can be refunded');
    }

    return this.processStripeRefund(payment, refundAmountCents, refundReason);
  }

  private async processStripeRefund(payment: any, refundAmountCents?: number, refundReason?: string): Promise<PaymentResponseDto> {
    try {
      const refundAmount = refundAmountCents || payment.amountCents;
      
      const refund = await this.stripe.refunds.create({
        payment_intent: payment.stripePaymentIntent,
        amount: refundAmount,
        reason: 'requested_by_customer',
        metadata: {
          refundReason: refundReason || 'No reason provided',
        },
      });

      const updatedPayment = await this.prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: refundAmount === payment.amountCents ? 'refunded' : 'partially_refunded',
        },
      });

      this.logger.log(`Stripe refund processed: ${refund.id} for payment ${payment.id}`);

      return updatedPayment;
    } catch (error) {
      this.logger.error(`Failed to process Stripe refund: ${error.message}`);
      throw new BadRequestException('Failed to process refund');
    }
  }

  async getStats(currentUser: any): Promise<PaymentStatsDto> {
    // Only ADMIN and STAFF can view payment stats
    if (currentUser.role === Role.CUSTOMER) {
      throw new ForbiddenException('Only staff and admin can view payment statistics');
    }

    let where: any = {};

    if (currentUser.role === Role.STAFF) {
      // Staff might have limited access to stats
      where = {};
    }

    const [total, payments] = await Promise.all([
      this.prisma.payment.count({ where }),
      this.prisma.payment.findMany({
        where,
        select: { amountCents: true, status: true },
      }),
    ]);

    const totalAmount = payments.reduce((sum, payment) => sum + payment.amountCents, 0);
    const succeeded = payments.filter(p => p.status === 'succeeded').length;
    const pending = payments.filter(p => p.status === 'pending').length;
    const failed = payments.filter(p => p.status === 'failed').length;
    const refunded = payments.filter(p => p.status === 'refunded').length;

    return {
      total,
      totalAmount,
      succeeded,
      pending,
      failed,
      refunded,
    };
  }

  async handleStripeWebhook(event: any): Promise<void> {
    try {
      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentIntentSucceeded(event.data.object);
          break;
        case 'payment_intent.payment_failed':
          await this.handlePaymentIntentFailed(event.data.object);
          break;
        case 'refund.created':
          await this.handleRefundCreated(event.data.object);
          break;
        default:
          this.logger.log(`Unhandled Stripe webhook event: ${event.type}`);
      }
    } catch (error) {
      this.logger.error(`Error handling Stripe webhook: ${error.message}`);
      throw error;
    }
  }

  private async handlePaymentIntentSucceeded(paymentIntent: any): Promise<void> {
    const payment = await this.prisma.payment.findFirst({
      where: { stripePaymentIntent: paymentIntent.id },
    });

    if (payment) {
      await this.prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'succeeded' },
      });

      // Update booking status
      await this.prisma.booking.update({
        where: { id: payment.bookingId },
        data: { status: 'CONFIRMED' },
      });

      this.logger.log(`Payment succeeded via webhook: ${payment.id}`);
    }
  }

  private async handlePaymentIntentFailed(paymentIntent: any): Promise<void> {
    const payment = await this.prisma.payment.findFirst({
      where: { stripePaymentIntent: paymentIntent.id },
    });

    if (payment) {
      await this.prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'failed' },
      });

      this.logger.log(`Payment failed via webhook: ${payment.id}`);
    }
  }

  private async handleRefundCreated(refund: any): Promise<void> {
    const payment = await this.prisma.payment.findFirst({
      where: { stripePaymentIntent: refund.payment_intent },
    });

    if (payment) {
      await this.prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: refund.amount === payment.amountCents ? 'refunded' : 'partially_refunded',
        },
      });

      this.logger.log(`Refund created via webhook: ${payment.id}`);
    }
  }
}