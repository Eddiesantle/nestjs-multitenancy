
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthCoreModule, PrismaCoreModule } from '@app/core';
import { EventosModule } from './eventos/eventos.module';
import { LugaresModule } from './lugares/lugares.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.partner2',
      isGlobal: true,
    }),
    AuthCoreModule,
    PrismaCoreModule,
    EventosModule,
    LugaresModule,
  ],
})
export class Partner2Module { }
