import { DynamicModule, Module, Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenModule } from './tokens/tokens.module';

@Global()
@Module({})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
      imports: [TokenModule],
      providers: [AuthService],
      exports: [AuthService],
    };
  }
}
