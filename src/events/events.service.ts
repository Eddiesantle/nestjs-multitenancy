import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TenantService } from 'src/tenant/tenant.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {

  constructor(private prismaService: PrismaService, private tenantService: TenantService) { }

  create(createEventDto: CreateEventDto) {

    return this.prismaService.event.create({
      data: {
        name: createEventDto.name,
        description: createEventDto.description,
        date: new Date(createEventDto.date),
        price: createEventDto.price,
        partnerId: this.tenantService.getTenant().id
      }
    })
  }

  findAll() {
    return this.prismaService.event.findMany({
      where: {
        partnerId: this.tenantService.getTenant().id
      }
    })
    return `This action returns all events`;
  }

  findOne(id: string) {
    return this.prismaService.event.findUnique({
      where: {
        partnerId: this.tenantService.getTenant().id,
        id
      }
    })
    return `This action returns a #${id} event`;
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return this.prismaService.event.update({
      data: {
        name: updateEventDto.name,
        description: updateEventDto.description,
        date: new Date(updateEventDto.date),
        price: updateEventDto.price
      },
      where: {
        partnerId: this.tenantService.getTenant().id,
        id
      }
    })
    return `This action updates a #${id} event`;
  }

  remove(id: string) {
    return this.prismaService.event.delete({
      where: {
        partnerId: this.tenantService.getTenant().id,
        id
      }
    })
    return `This action removes a #${id} event`;
  }
}
