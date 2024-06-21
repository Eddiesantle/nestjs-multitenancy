import { AuthCoreModule, AuthService } from '@app/core';


import { UsersService } from '@app/core/auth/users/users.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PartnerUsersController } from './partner-users/partner-users.controller';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    AuthCoreModule
  ],
  controllers: [UsersController, PartnerUsersController, AuthController],
  providers: [UsersService, AuthService]
})
export class AuthModule { }
