import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PartnerUsersController } from './partner-users/partner-users.controller';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: '12654',
      signOptions: { expiresIn: '10000s' }
    })
  ],
  controllers: [UsersController, PartnerUsersController, AuthController],
  providers: [UsersService, AuthService]
})
export class AuthModule { }
