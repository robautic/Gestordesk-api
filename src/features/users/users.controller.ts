import { Controller, Post, Body, Inject } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserInput } from './users.service.js';

@Controller('users')
export class UsersController {
    constructor(@Inject(UsersService) private usersService: UsersService) {
        console.log('UsersService injetado:', usersService)
    }

    @Post()
    async create(@Body() body: CreateUserInput) {
        return await this.usersService.create(body);
    }
}