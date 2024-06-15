import { Body, Controller, Get } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }
}
