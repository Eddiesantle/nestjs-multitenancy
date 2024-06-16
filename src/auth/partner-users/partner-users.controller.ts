
import { Body, Controller, Post } from '@nestjs/common';
import { CreatePartnerUserDto } from '../users/dtos/create-partner-user.dto';
import { UserPresenter } from '../users/user.presenter';
import { UsersService } from '../users/users.service';

@Controller('patners/users')
export class PartnerUsersController {

    constructor(private usersService: UsersService) { }

    @Post()
    async create(@Body() data: CreatePartnerUserDto) {
        const user = await this.usersService.createPatnerUser(data);

        return new UserPresenter(user)
    }
}
