import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);

  constructor(@Inject('ACCESS_JWT_SERVICE') private readonly jwt: JwtService) {}

  async sign(payload: Record<string, unknown>) {
    try {
      return await this.jwt.signAsync(payload);
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
