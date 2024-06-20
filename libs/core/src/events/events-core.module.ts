import { Module } from '@nestjs/common';
import { PrismaCoreModule } from '../prisma/prisma-core.module';
import { TenantCoreModule } from '../tenant/tenant-core.module';
import { EventsService } from './events.service';

@Module({
  imports: [PrismaCoreModule, TenantCoreModule],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsCoreModule { }
