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
  Headers,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
  ApiHeader,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { PaymentsService } from './payments.service';
import { CreatePaymentIntentDto, ProcessPaymentDto, RefundPaymentDto, PaymentQueryDto } from './dto/create-payment.dto';
import { PaymentResponseDto, PaymentIntentResponseDto, PaymentStatsDto } from './dto/payment-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@ApiTags('Payments')
@Controller('payments')
@UseGuards(ThrottlerGuard, JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-intent')
  @ApiOperation({ summary: 'Create payment intent' })
  @ApiResponse({ status: 201, description: 'Payment intent created successfully', type: PaymentIntentResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async createPaymentIntent(
    @Body() createPaymentIntentDto: CreatePaymentIntentDto,
    @CurrentUser() user: any,
  ): Promise<PaymentIntentResponseDto> {
    return this.paymentsService.createPaymentIntent(createPaymentIntentDto, user.id);
  }

  @Post('process')
  @ApiOperation({ summary: 'Process payment' })
  @ApiResponse({ status: 200, description: 'Payment processed successfully', type: PaymentResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  async processPayment(
    @Body() processPaymentDto: ProcessPaymentDto,
    @CurrentUser() user: any,
  ): Promise<PaymentResponseDto> {
    return this.paymentsService.processPayment(processPaymentDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all payments with pagination and filters' })
  @ApiResponse({ status: 200, description: 'Payments retrieved successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiQuery({ name: 'bookingId', required: false, type: String, description: 'Filter by booking ID' })
  @ApiQuery({ name: 'userId', required: false, type: String, description: 'Filter by user ID (Admin/Staff only)' })
  async findAll(
    @Query() query: PaymentQueryDto,
    @CurrentUser() user: any,
  ) {
    return this.paymentsService.findAll(query, user);
  }

  @Get('stats')
  @UseGuards(RolesGuard)
  @Roles(Role.STAFF, Role.ADMIN)
  @ApiOperation({ summary: 'Get payment statistics (Staff/Admin only)' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully', type: PaymentStatsDto })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getStats(@CurrentUser() user: any): Promise<PaymentStatsDto> {
    return this.paymentsService.getStats(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment by ID' })
  @ApiResponse({ status: 200, description: 'Payment retrieved successfully', type: PaymentResponseDto })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  @ApiParam({ name: 'id', description: 'Payment ID' })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ): Promise<PaymentResponseDto> {
    return this.paymentsService.findOne(id, user);
  }

  @Post('refund')
  @UseGuards(RolesGuard)
  @Roles(Role.STAFF, Role.ADMIN)
  @ApiOperation({ summary: 'Refund payment (Staff/Admin only)' })
  @ApiResponse({ status: 200, description: 'Payment refunded successfully', type: PaymentResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async refundPayment(
    @Body() refundPaymentDto: RefundPaymentDto,
    @CurrentUser() user: any,
  ): Promise<PaymentResponseDto> {
    return this.paymentsService.refundPayment(refundPaymentDto, user);
  }

  @Post('webhook/stripe')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Stripe webhook endpoint' })
  @ApiResponse({ status: 200, description: 'Webhook processed successfully' })
  @ApiHeader({ name: 'stripe-signature', description: 'Stripe signature header' })
  async handleStripeWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ): Promise<void> {
    // In a real implementation, you would verify the Stripe signature here
    // For now, we'll just process the event
    const event = req.body;
    return this.paymentsService.handleStripeWebhook(event);
  }
}
