import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service.js';
import { hash } from 'bcryptjs';
import { z } from 'zod';

const createUserSchema = z.object({
    name: z.string().min(2, 'Name must have at least 2 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must have at least 6 characters'),
    role: z.enum(['AGENT', 'SUPERVISOR', 'ADMIN']).optional().default('AGENT'),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

@Injectable()
export class UsersService {
    constructor(@Inject(PrismaService) private prisma: PrismaService) {}

    async create(input: CreateUserInput){
        const { name, email, password, role } = createUserSchema.parse(input);

        const userAlreadyExists = await this.prisma.user.findUnique({
            where: { email },
        });

        if (userAlreadyExists){
            throw new ConflictException('Email already registered');

        }

        const passwordHash = await hash(password, 6);

        const user = await this.prisma.user.create({
            data:{
                name,
                email,
                passwordHash,
                role,
            },
        });

        return {
            user:{
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            },
        };
    }
}
