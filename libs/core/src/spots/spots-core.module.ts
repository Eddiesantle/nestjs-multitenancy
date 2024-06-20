import { Module } from '@nestjs/common';
import { PrismaCoreModule } from '../prisma/prisma-core.module';
import { SpotsService } from './spots.service';


@Module({
  imports: [PrismaCoreModule],
  providers: [SpotsService],
  exports: [SpotsService]
})
export class SpotsCoreModule { }
