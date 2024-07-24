

import { AuthGuard } from '@app/core/auth/auth.guard';
import { Roles } from '@app/core/auth/roles/roles.decorator';
import { RolesGuard } from '@app/core/auth/roles/roles.guard';
import { EventsService } from '@app/core/events/events.service';
import { TenantInterceptor } from '@app/core/tenant/tenant.interceptor';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserRoles } from '../auth/users/user-roles';
import { EventsCreateValidationPipe } from './events-create-validation.pipe';
import { EventsReserveValidationPipe } from './events-reserve-validation.pipe';
import { EventsUptadeValidationPipe } from './events-update-validation.pipe';
import { CreateEventRequest } from './request/create-event.request';
import { ReserveSpotRequest } from './request/reserve-spot.request';
import { UpdateEventRequest } from './request/update-event.request';

// partner
//user admin
//user user

@UseInterceptors(TenantInterceptor)
@UseGuards(AuthGuard, RolesGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Roles(UserRoles.PARTNER)
  @Post()
  create(@Body(new EventsCreateValidationPipe()) createEventRequest: CreateEventRequest) {

    return this.eventsService.create(createEventRequest);
  }

  @Roles(UserRoles.PARTNER)
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body(new EventsUptadeValidationPipe()) updateEventRequest: UpdateEventRequest) {
    return this.eventsService.update(id, updateEventRequest);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @Post(':id/reserve')
  reserveSpots(@Body(new EventsReserveValidationPipe()) reserveRequest: ReserveSpotRequest, @Param('id') eventId: string) {

    console.log('reserveSpots -> reserveRequest', reserveRequest)

    return this.eventsService.reserveSpot({ ...reserveRequest, eventId })
  }
}
