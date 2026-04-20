import { compare } from 'bcryptjs'
import type { UsersRepository } from '@/repositories/users-repository.js'

interface AuthenticateServiceRequest {
    email: string
    password: string
}

interface AuthenticateServiceResponse {
    user: {
        id: string
        name: string
        email: string
        role: string
    }
}

export class AuthenticateService {
    constructor (private usersRepository: UsersRepository) {}

    async execute({
        email,
        password,
    } : AuthenticateServiceRequest) : Promise<AuthenticateServiceResponse>
{
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
        throw new Error('INVALID_CREDENTIALS')
    }

    const passwordMatch = await compare(password, user.passwordHash)

    if (!passwordMatch) {
        throw new Error ('INVALID_CREDENTIALS')
    }

    return { user }
 }
}