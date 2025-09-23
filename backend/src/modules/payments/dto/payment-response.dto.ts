import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaymentResponseDto {
  @ApiProperty()
  id: string;

  @ApiPropertyOptional()
  bookingId?: string;

  @ApiProperty()
  amountCents: number;

  @ApiProperty()
  currency: string;

  @ApiPropertyOptional()
  stripePaymentIntent?: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional()
  booking?: any;
}

export class PaymentIntentResponseDto {
  @ApiProperty()
  clientSecret: string;

  @ApiProperty()
  paymentIntentId: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  status: string;
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
}