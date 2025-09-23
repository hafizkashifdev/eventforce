import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../common/prisma/prisma.service';
import { RedisService } from '../../common/redis/redis.service';
import { HealthCheckDto, ServiceHealthDto } from './dto/health-response.dto';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);
  private readonly startTime = Date.now();

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly configService: ConfigService,
  ) {}

  async checkHealth(): Promise<HealthCheckDto> {
    const timestamp = new Date().toISOString();
    const uptime = Math.floor((Date.now() - this.startTime) / 1000);

    const [databaseHealth, redisHealth, queueHealth] = await Promise.all([
      this.checkDatabase(),
      this.checkRedis(),
      this.checkQueue(),
    ]);

    const overallStatus = 
      databaseHealth.status === 'ok' && 
      redisHealth.status === 'ok' && 
      queueHealth.status === 'ok' 
        ? 'ok' 
        : 'error';

    return {
      status: overallStatus,
      timestamp,
      uptime,
      version: this.configService.get('APP_VERSION', '1.0.0'),
      environment: this.configService.get('NODE_ENV', 'development'),
      services: {
        database: databaseHealth,
        redis: redisHealth,
        queue: queueHealth,
      },
    };
  }

  private async checkDatabase(): Promise<ServiceHealthDto> {
    const startTime = Date.now();
    
    try {
      // Test database connection with a simple query
      await this.prisma.$queryRaw`SELECT 1`;
      
      const responseTime = Date.now() - startTime;
      
      this.logger.debug(`Database health check passed in ${responseTime}ms`);
      
      return {
        status: 'ok',
        responseTime,
        lastChecked: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error('Database health check failed:', error);
      
      return {
        status: 'error',
        message: error.message,
        lastChecked: new Date().toISOString(),
      };
    }
  }

  private async checkRedis(): Promise<ServiceHealthDto> {
    const startTime = Date.now();
    
    try {
      // Test Redis connection with a ping
      const result = await this.redis.ping();
      
      if (result !== 'PONG') {
        throw new Error('Redis ping did not return PONG');
      }
      
      const responseTime = Date.now() - startTime;
      
      this.logger.debug(`Redis health check passed in ${responseTime}ms`);
      
      return {
        status: 'ok',
        responseTime,
        lastChecked: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error('Redis health check failed:', error);
      
      return {
        status: 'error',
        message: error.message,
        lastChecked: new Date().toISOString(),
      };
    }
  }

  private async checkQueue(): Promise<ServiceHealthDto> {
    const startTime = Date.now();
    
    try {
      // Test queue connection by checking if we can access the queue
      // This is a basic check - in a real implementation you might want to check
      // if the queue is actually processing jobs
      const isConnected = await this.redis.isConnected();
      
      if (!isConnected) {
        throw new Error('Queue service not connected');
      }
      
      const responseTime = Date.now() - startTime;
      
      this.logger.debug(`Queue health check passed in ${responseTime}ms`);
      
      return {
        status: 'ok',
        responseTime,
        lastChecked: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error('Queue health check failed:', error);
      
      return {
        status: 'error',
        message: error.message,
        lastChecked: new Date().toISOString(),
      };
    }
  }

  async getDetailedHealth(): Promise<any> {
    const health = await this.checkHealth();
    
    // Add additional system information
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    
    return {
      ...health,
      system: {
        platform: process.platform,
        nodeVersion: process.version,
        memory: {
          used: Math.round(memoryUsage.heapUsed / 1024 / 1024),
          total: Math.round(memoryUsage.heapTotal / 1024 / 1024),
          external: Math.round(memoryUsage.external / 1024 / 1024),
          rss: Math.round(memoryUsage.rss / 1024 / 1024),
        },
        cpu: {
          user: cpuUsage.user,
          system: cpuUsage.system,
        },
        pid: process.pid,
        uptime: process.uptime(),
      },
    };
  }
}
