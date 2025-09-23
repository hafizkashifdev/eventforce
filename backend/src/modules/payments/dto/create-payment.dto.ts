import { IsString, IsOptional, IsInt, Min, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePaymentIntentDto {
  @ApiProperty({ description: 'Booking ID for the payment' })
  @IsUUID()
  bookingId: string;
}

export class ProcessPaymentDto {
  @ApiProperty({ description: 'Payment intent ID from Stripe' })
  @IsString()
  paymentIntentId: string;

  @ApiProperty({ description: 'Booking ID' })
  @IsUUID()
  bookingId: string;
}

export class RefundPaymentDto {
  @ApiProperty({ description: 'Payment ID to refund' })
  @IsUUID()
  paymentId: string;

  @ApiPropertyOptional({ description: 'Refund amount in cents (partial refund)' })
  @IsOptional()
  @IsInt()
  @Min(1)
  refundAmountCents?: number;

  @ApiPropertyOptional({ description: 'Reason for refund' })
  @IsOptional()
  @IsString()
  refundReason?: string;
}

export class PaymentQueryDto {
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

  @ApiPropertyOptional({ description: 'Filter by booking ID' })
  @IsOptional()
  @IsUUID()
  bookingId?: string;

  @ApiPropertyOptional({ description: 'Filter by user ID' })
  @IsOptional()
  @IsUUID()
  userId?: string;
}

export class StripeWebhookDto {
  @ApiProperty({ description: 'Stripe webhook event data' })
  data: any;

  @ApiProperty({ description: 'Stripe webhook event type' })
  type: string;
}