import { Module } from '@nestjs/common';
import {PrismaModule} from './prisma/prisma.module.js';
import { UsersModule } from './features/users/users.module.js';

@Module({
    imports: [PrismaModule, UsersModule],
    controllers: [],
    providers: [],
})

export class AppModule {} 