import { Controller, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { HealthService } from './health.service';
import { HealthCheckDto } from './dto/health-response.dto';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Health status retrieved successfully', type: HealthCheckDto })
  @ApiResponse({ status: 503, description: 'Service unavailable' })
  async checkHealth(): Promise<HealthCheckDto> {
    return this.healthService.checkHealth();
  }

  @Get('detailed')
  @ApiOperation({ summary: 'Detailed health check with system information' })
  @ApiResponse({ status: 200, description: 'Detailed health status retrieved successfully' })
  @ApiResponse({ status: 503, description: 'Service unavailable' })
  async getDetailedHealth(): Promise<any> {
    return this.healthService.getDetailedHealth();
  }
}
