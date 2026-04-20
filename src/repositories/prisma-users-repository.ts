import { prisma } from '@/lib/prisma.js'
import type { CreateUserData, UsersRepository} from './users-repository.js'

export class PrismaUsersRepository implements UsersRepository {
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {email},
        })
        
        return user
    }
async create(data: CreateUserData){
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            passwordHash: data.passwordHash,
            role: data.role,
        },
    })

    return user 
}
}