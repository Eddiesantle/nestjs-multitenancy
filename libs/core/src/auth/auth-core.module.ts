import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from './users/users.service';

@Module({
  providers: [UsersService, AuthService],
  exports: [UsersService, AuthService],
})
export class AuthCoreModule { }
