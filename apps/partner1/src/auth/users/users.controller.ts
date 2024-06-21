

import { UsersService } from '@app/core/auth/users/users.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreatePartnerUserRequest } from './dtos/create-partner-user.request';
import { UserPresenter } from './user.presenter';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post()
  async create(@Body() data: CreatePartnerUserRequest) {
    const user = await this.usersService.createCommonUser(data);

    return new UserPresenter(user)
  }
}
