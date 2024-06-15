import { Body, Controller, Post } from '@nestjs/common';
import { CreatePatnerUserDto } from './dtos/create-patner-user.dto';
import { UserPresenter } from './user.presenter';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @Post()
  async create(@Body() data: CreatePatnerUserDto) {
    const user = await this.usersService.createCommonUser(data);

    return new UserPresenter(user)
  }
}
