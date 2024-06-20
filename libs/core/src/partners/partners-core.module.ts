import { Module } from '@nestjs/common';
import { PrismaCoreModule } from '../prisma/prisma-core.module';
import { PartnersService } from './partners.service';

@Module({
  imports: [PrismaCoreModule],
  providers: [PartnersService],
  exports: [PartnersService],
})
export class PartnersCoreModule { }
