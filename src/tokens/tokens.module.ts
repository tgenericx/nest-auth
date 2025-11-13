import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { accessJwtConfigFactory } from './jwt/access-jwt.config';
import { refreshJwtConfigFactory } from './jwt/refresh-jwt.config';
import { AccessTokenService } from './access-token.service';
import { RefreshTokenService } from './refresh-token.service';

@Global()
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: accessJwtConfigFactory,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: refreshJwtConfigFactory,
    }),
  ],
  providers: [AccessTokenService, RefreshTokenService],
  exports: [AccessTokenService, RefreshTokenService],
})
export class TokenModule {}
