import { Injectable } from '@nestjs/common';
import { AccessTokenService } from './tokens/access-token.service';
import { RefreshTokenService } from './tokens/refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly accessTokens: AccessTokenService,
    private readonly refreshTokens: RefreshTokenService,
  ) {}

  async issueTokens(user: { id: string }) {
    const payload = { sub: user.id };
    const accessToken = await this.accessTokens.sign(payload);
    const refreshToken = await this.refreshTokens.sign(payload);
    return { accessToken, refreshToken };
  }

  async verifyAccessToken(token: string) {
    return this.accessTokens.verify(token);
  }

  async verifyRefreshToken(token: string) {
    return this.refreshTokens.verify(token);
  }
}
