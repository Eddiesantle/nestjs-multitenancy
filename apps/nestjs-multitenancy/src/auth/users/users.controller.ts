import { Body, Controller, Post } from '@nestjs/common';
import { CreatePartnerUserDto } from './dtos/create-partner-user.dto';
import { UserPresenter } from './user.presenter';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post()
  async create(@Body() data: CreatePartnerUserDto) {
    const user = await this.usersService.createCommonUser(data);

    return new UserPresenter(user)
  }
}
