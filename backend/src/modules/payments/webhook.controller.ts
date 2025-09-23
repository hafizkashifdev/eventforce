import {
  Controller,
  Post,
  Req,
  Res,
  HttpStatus,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@ApiTags('Webhooks')
@Controller('webhooks')
@UseGuards(ThrottlerGuard)
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);
  private readonly stripe: Stripe;

  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly configService: ConfigService,
  ) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-10-16',
    });
  }

  @Post('stripe')
  @ApiOperation({ summary: 'Handle Stripe webhooks' })
  @ApiResponse({ status: 200, description: 'Webhook processed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid webhook signature' })
  async handleStripeWebhook(@Req() req: Request, @Res() res: Response) {
    const sig = req.headers['stripe-signature'] as string;
    const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');

    if (!sig || !webhookSecret) {
      this.logger.error('Missing Stripe signature or webhook secret');
      throw new BadRequestException('Missing webhook signature');
    }

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      this.logger.error(`Webhook signature verification failed: ${err.message}`);
      throw new BadRequestException('Invalid webhook signature');
    }

    try {
      await this.paymentsService.handleStripeWebhook(event);
      res.status(HttpStatus.OK).json({ received: true });
    } catch (error) {
      this.logger.error(`Error processing webhook: ${error.message}`);
      res.status(HttpStatus.BAD_REQUEST).json({ error: 'Webhook processing failed' });
    }
  }
}
