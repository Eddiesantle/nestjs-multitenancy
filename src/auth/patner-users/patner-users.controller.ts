
import { Body, Controller, Post } from '@nestjs/common';
import { CreatePatnerUserDto } from '../users/dtos/create-patner-user.dto';
import { UserPresenter } from '../users/user.presenter';
import { UsersService } from '../users/users.service';

@Controller('patners/users')
export class PatnerUsersController {

    constructor(private usersService: UsersService){}

    @Post()
    async create(@Body() data: CreatePatnerUserDto) {
        const user = await this.usersService.createPatnerUser(data);

        return new UserPresenter(user)
    }
}
