import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../common/prisma/prisma.service';
import { randomBytes } from 'crypto';

@Injectable()
export class RefreshTokenService {
  private readonly logger = new Logger(RefreshTokenService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(userId: string): Promise<string> {
    // Generate a random token
    const token = randomBytes(32).toString('hex');
    
    // Set expiration (7 days by default)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Store in database
    await this.prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });

    // Sign JWT with the token as payload
    const jwtPayload = {
      sub: userId,
      token,
      type: 'refresh',
    };

    return this.jwtService.sign(jwtPayload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
    });
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      // Verify JWT
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      if (payload.type !== 'refresh') {
        return false;
      }

      // Check if token exists in database and is not revoked
      const refreshToken = await this.prisma.refreshToken.findFirst({
        where: {
          token: payload.token,
          userId: payload.sub,
          isRevoked: false,
          expiresAt: {
            gt: new Date(),
          },
        },
      });

      return !!refreshToken;
    } catch (error) {
      this.logger.error('Invalid refresh token:', error);
      return false;
    }
  }

  async revokeToken(token: string): Promise<void> {
    try {
      // Verify JWT to get the token
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      if (payload.type === 'refresh') {
        await this.prisma.refreshToken.updateMany({
          where: {
            token: payload.token,
            userId: payload.sub,
          },
          data: {
            isRevoked: true,
          },
        });
      }
    } catch (error) {
      this.logger.error('Error revoking refresh token:', error);
    }
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: {
        userId,
        isRevoked: false,
      },
      data: {
        isRevoked: true,
      },
    });
  }

  async cleanupExpiredTokens(): Promise<number> {
    const result = await this.prisma.refreshToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    this.logger.log(`Cleaned up ${result.count} expired refresh tokens`);
    return result.count;
  }
}
