import { PrismaCoreModule } from '@app/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { PartnersModule } from './partners/partners.module';
import { SpotsModule } from './spots/spots.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env.partner1', isGlobal: true },), PrismaCoreModule, PartnersModule, AuthModule, EventsModule, SpotsModule],
})
export class Partner1Module { }
