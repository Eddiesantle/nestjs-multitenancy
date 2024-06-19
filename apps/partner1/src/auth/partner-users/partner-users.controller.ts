

import { UsersService } from '@app/core/auth/users/users.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreatePartnerUserRequest } from '../users/dtos/create-partner-user.request';
import { UserPresenter } from '../users/user.presenter';

@Controller('patners/users')
export class PartnerUsersController {

    constructor(private usersService: UsersService) { }

    @Post()
    async create(@Body() data: CreatePartnerUserRequest) {
        const user = await this.usersService.createPatnerUser(data);

        return new UserPresenter(user)
    }
}
