import { INestApplicationContext } from '@nestjs/common';
import { CreatePartnerUserDto } from './auth/users/dtos/create-partner-user.dto';
import { UsersService } from './auth/users/users.service';
import { CreateEventDto } from './events/dto/create-event.dto';
import { EventsService } from './events/events.service';
import { PartnersService } from './partners/partners.service';
import { PrismaService } from './prisma/prisma.service';
import { SpotsService } from './spots/spots.service';
import { TenantService } from './tenant/tenant.service';

export async function fixture(
  app: INestApplicationContext,
  partnerUser: CreatePartnerUserDto,
  events: CreateEventDto[],
  numSpots: number,
) {
  const prismaService = app.get<PrismaService>(PrismaService);

  await prismaService.reservationHistory.deleteMany({});
  await prismaService.ticket.deleteMany({});
  await prismaService.spot.deleteMany({});
  await prismaService.event.deleteMany({});
  await prismaService.partner.deleteMany({});


  const usersService = app.get(UsersService);
  const partnerService = app.get(PartnersService);
  const eventService = app.get(EventsService);
  const spotService = app.get(SpotsService);
  // Usando resolve para obter uma instância de TenantService
  const tenantService = await app.resolve(TenantService);

  const createdPartnerUser = await usersService.createPatnerUser(partnerUser)

  const partnerUserId = createdPartnerUser.id
  const partnerUserName = partnerUser.name

  const createdPartner = await partnerService.create({ name: partnerUserName, userId: partnerUserId })

  await tenantService.setTenant(createdPartner);

  const createdEvents = await Promise.all(
    events.map((event) => eventService.create({ ...event })),
  );

  const spots = [];
  for (let i = 0; i < numSpots; i++) {
    const row = String.fromCharCode(97 + Math.floor(i / 5));
    const column = (i % 5) + 1;
    createdEvents.forEach((event) => {
      spots.push({
        name: `${row}${column}`,
        eventId: event.id,
      });
    });
  }

  await Promise.all(



    spots.map((spot) => spotService.create(spot))

  );
}
