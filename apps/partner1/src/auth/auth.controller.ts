
import { AuthService } from '@app/core';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequest } from './login.request';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('login')
    login(@Body() data: LoginRequest) {
        return this.authService.login(data)

    }
}
