import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class AuthModule {
  static forRoot(options: any): DynamicModule {
    return {
      module: AuthModule,
      providers: [
        {
          provide: 'AUTH_OPTIONS',
          useValue: options
        }
      ],
      exports: []
    };
  }
}
