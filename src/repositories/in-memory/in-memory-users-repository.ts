import { StringFormatParams } from 'zod/v4/core'
import type { CreateUserData, UsersRepository} from '../users-repository.js'

export class InMemoryUsersRepository implements UsersRepository {
    public items: {
        id: string
        name: string
        email: string
        passwordHash: string
        role: string
    } [] = []

    async findByEmail(email: string) {
        const user = this.items.find((item) => item.email === email)
        return user ?? null
    }

    async create(data: CreateUserData) {
        const user = {
            id: crypto.randomUUID(),
            name: data.name,
            email: data.email,
            passwordHash: data.passwordHash,
            role: data.role ?? 'AGENT',
        }
    this.items.push(user)
    return user 
    }
}