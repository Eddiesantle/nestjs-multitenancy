import { PartnersCoreModule } from '@app/core';
import { Module } from '@nestjs/common';
import { PartnersController } from './partners.controller';

@Module({
  imports: [PartnersCoreModule],
  controllers: [PartnersController],
})
export class PartnersModule { }
