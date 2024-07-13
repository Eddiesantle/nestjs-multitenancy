
import { PrismaCoreModule } from '@app/core/prisma/prisma-core.module';
import { TenantCoreModule } from '@app/core/tenant/tenant-core.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { PartnersModule } from './partners/partners.module';
import { SpotsModule } from './spots/spots.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.partner1', isGlobal: true }),
    PrismaCoreModule,
    TenantCoreModule,
    PartnersModule,
    AuthModule,
    EventsModule,
    SpotsModule],
})
export class Partner1Module { }
