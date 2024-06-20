
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, SpotStatus, TicketStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TenantService } from '../tenant/tenant.service';
import { CreateEventDto } from './dto/create-event.dto';
import { ReserveSpotDto } from './dto/reserve-spot.dto';
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

  }

  findOne(id: string) {
    return this.prismaService.event.findUnique({
      where: {
        partnerId: this.tenantService.getTenant().id,
        id
      }
    })

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

  }

  remove(id: string) {
    return this.prismaService.event.delete({
      where: {
        partnerId: this.tenantService.getTenant().id,
        id
      }
    })

  }

  async reserveSpot(dto: ReserveSpotDto & { eventId: string }) {
    // Consultar se lugares existem
    const spots = await this.prismaService.spot.findMany({
      where: {
        eventId: dto.eventId,
        name: {
          in: dto.spots
        }
      }
    })

    if (spots.length !== dto.spots.length) {
      const foundSpotName = spots.map((spot) => spot.name)
      const notFoundSpotsName = dto.spots.filter((spotName) => {
        !foundSpotName.includes(spotName)

      })

      throw new Error(`Spots ${notFoundSpotsName.join(', ')} not found`)
    }

    try {
      const tickets = await this.prismaService.$transaction(async (prisma) => {
        await prisma.reservationHistory.createMany({
          data: spots.map((spot) => ({
            spotId: spot.id,
            ticketKind: dto.ticket_kind,
            email: dto.email,
            status: TicketStatus.reserved
          }))
        })

        await prisma.spot.updateMany({
          where: {
            id: {
              in: spots.map((spot) => spot.id)
            }
          },
          data: {
            status: SpotStatus.reserved
          }
        })

        const tickets = await Promise.all(
          spots.map((spot) => prisma.ticket.create({
            data: {
              spotId: spot.id,
              ticketKind: dto.ticket_kind,
              email: dto.email,
            }
          }))
        )

        return tickets
      }, { isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted })
      return tickets
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2002': // unique constraint violation
            throw new BadRequestException({ message: 'Some spots are already reserved' });
          case 'P2034': // transection conflict
            throw new BadRequestException({ message: 'Transaction conflict occurred' });
          default:
            throw new InternalServerErrorException({ message: 'Database error occurred' });
        }


      } else {
        throw new InternalServerErrorException({ message: 'Unknown error occurred' });
      }
    }



  }
}
