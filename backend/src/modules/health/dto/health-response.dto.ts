import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckDto {
  @ApiProperty()
  status: 'ok' | 'error';

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  uptime: number;

  @ApiProperty()
  version: string;

  @ApiProperty()
  environment: string;

  @ApiProperty()
  services: {
    database: ServiceHealthDto;
    redis: ServiceHealthDto;
    queue: ServiceHealthDto;
  };
}

export class ServiceHealthDto {
  @ApiProperty()
  status: 'ok' | 'error';

  @ApiProperty()
  responseTime?: number;

  @ApiProperty()
  message?: string;

  @ApiProperty()
  lastChecked: string;
}
