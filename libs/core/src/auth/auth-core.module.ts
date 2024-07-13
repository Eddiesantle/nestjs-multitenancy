import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from './users/users.service';
// Configuração do dotenv para carregar as variáveis de ambiente
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();


@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: configService.get<string>('SECRET_KEY_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UsersService, AuthService]
})
export class AuthCoreModule { }
