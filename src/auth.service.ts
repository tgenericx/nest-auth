import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_OPTIONS') private readonly options: unknown) {}
}
