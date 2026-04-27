import {describe, it, expect, beforeEach} from 'vitest'
import {RegisterService} from '../register.service.js'
import {InMemoryUsersRepository} from '@/repositories/in-memory/in-memory-users-repository.js'
import {compare} from 'bcryptjs'

describe('RegisterService', () => {
    let usersRepository: InMemoryUsersRepository
    let registerService: RegisterService

    beforeEach (() =>{
        usersRepository = new InMemoryUsersRepository()
        registerService = new RegisterService (usersRepository)

    })

    it ('deve criar um usuário com senha criptografada', async () =>{
        const { user } = await registerService.execute({
            name: 'João Silva',
            email: 'joao@email.com',
            password: '123456',
        })

        const passwordMatch = await compare ('123456', usersRepository.items[0].passwordHash)

        expect (user.email). toBe('joao@email.com')
        expect (passwordMatch).toBe(true)
    })
    it ('não deve criar usuário com email duplicado', async () => {
        await registerService.execute({
            name: 'João Silva',
            email: 'joao@email.com',
            password: '123456',
        })

        await expect(
            registerService.execute({
                name: 'João Silva',
                email: 'joao@email.com',
                password: '123456',
            }),
        ).rejects.toThrow('EMAIL_TAKEN')
    })
})