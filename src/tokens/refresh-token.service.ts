import {
  Injectable,
  Logger,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenService {
  private readonly logger = new Logger(RefreshTokenService.name);
  private readonly refreshTokenTtlMs: number;

  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {
    const days =
      Number(this.config.get<number>('REFRESH_TOKEN_EXPIRES_IN_DAYS', 7)) || 7;
    this.refreshTokenTtlMs = days * 24 * 60 * 60 * 1000;
  }

  async sign(payload: Record<string, unknown>) {
    try {
      return await this.jwt.signAsync({
        ...payload,
        type: 'refresh',
      });
    } catch (error) {
      this.logger.error('Failed to generate access token', error);
      throw new InternalServerErrorException('Failed to generate access token');
    }
  }

  async verify(token: string): Promise<object> {
    try {
      return await this.jwt.verifyAsync(token);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === 'TokenExpiredError') {
          throw new UnauthorizedException('Expired token');
        } else if (error.name === 'JsonWebTokenError') {
          throw new UnauthorizedException('Invalid token');
        }

        this.logger.error('Token verification failed', error);
        throw new UnauthorizedException('Token verification error');
      }

      this.logger.error('Unknown token verification failure', error);
      throw new UnauthorizedException('Token verification error');
    }
  }
}
