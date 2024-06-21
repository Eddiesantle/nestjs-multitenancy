import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaCoreModule } from '../prisma/prisma-core.module';
import { AuthService } from './auth.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: process.env.SECRET_KEY_EXPIRES_IN }
    }),
    AuthCoreModule,
    PrismaCoreModule
  ],
  providers: [UsersService, AuthService]
})
export class AuthCoreModule { }
