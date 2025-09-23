import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationType, NotificationStatus } from '@prisma/client';

export class NotificationResponseDto {
  @ApiProperty()
  id: string;

  @ApiPropertyOptional()
  userId?: string;

  @ApiPropertyOptional()
  bookingId?: string;

  @ApiProperty({ enum: NotificationType })
  type: NotificationType;

  @ApiProperty({ enum: NotificationStatus })
  status: NotificationStatus;

  @ApiPropertyOptional()
  subject?: string;

  @ApiProperty()
  content: string;

  @ApiPropertyOptional()
  templateId?: string;

  @ApiPropertyOptional()
  metadata?: any;

  @ApiPropertyOptional()
  sentAt?: Date;

  @ApiPropertyOptional()
  failedAt?: Date;

  @ApiPropertyOptional()
  errorMessage?: string;

  @ApiProperty()
  retryCount: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
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
  delivered: number;

  @ApiProperty()
  byType: Record<string, number>;

  @ApiProperty()
  byStatus: Record<string, number>;
}
