import { hash } from 'bcryptjs'
import type { UsersRepository } from '@/repositories/users-repository.js'

interface RegisterServiceRequest {
    name: string
    email: string
    password: string
}

interface RegisterServiceResponse {
    user: {
        id: string
        name: string
        email: string
        role: string
    }
}

export class RegisterService {
    constructor (private usersRepository: UsersRepository) {}

    async execute ({
        name,
        email,
        password,
    }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
      const userWithSameEmail = await
this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new Error ('EMAIL_TAKEN')
        }
        
        const passwordHash = await hash(password, 6)

        const user = await this.usersRepository.create({
            name,
            email,
            passwordHash,
        })

        return { user }
    }
}