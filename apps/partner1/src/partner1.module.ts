import { EventsCoreModule, SpotsCoreModule } from '@app/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env.partner1' }), SpotsCoreModule, EventsCoreModule]
})
export class Partner1Module { }
