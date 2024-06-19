import { PrismaService } from '@app/core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { SpotStatus } from '@prisma/client';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';

@Injectable()
export class SpotsService {

  constructor(private prismaService: PrismaService) { }

  async create(createSpotDto: CreateSpotDto & { eventId: string }) {

    const event = await this.prismaService.event.findFirst({
      where: {
        id: createSpotDto.eventId
      }
    })

    if (!event) {
      throw new Error('Event not found')
    }

    return this.prismaService.spot.create({
      data: {
        ...createSpotDto,
        status: SpotStatus.available
      }
    })
    return 'This action adds a new spot';
  }

  findAll(eventId: string) {
    return this.prismaService.spot.findMany({
      where: {
        eventId,
      }
    })
    return `This action returns all spots`;
  }

  findOne(eventId: string, spotId: string) {
    return this.prismaService.spot.findMany({
      where: {
        id: spotId,
        eventId,
      }
    })
    return `This action returns a #${spotId} spot`;
  }

  update(eventId: string, spotId: string, updateSpotDto: UpdateSpotDto) {
    return this.prismaService.spot.update({
      where: {
        id: spotId,
        eventId,
      },
      data: updateSpotDto
    })
    return `This action updates a #${spotId} spot`;
  }

  remove(eventId: string, spotId: string,) {
    return `This action removes a #${spotId} spot`;
  }
}
