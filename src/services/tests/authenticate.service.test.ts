import { describe, it, expect, beforeEach } from 'vitest'
import { AuthenticateService } from '../authenticate.service.js'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { hash } from 'bcryptjs'

describe('AuthenticateService', () => {
  let usersRepository: InMemoryUsersRepository
  let authenticateService: AuthenticateService

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authenticateService = new AuthenticateService(usersRepository)
  })

  it('deve autenticar com email e senha corretos', async () => {
    await usersRepository.items.push({
      id: crypto.randomUUID(),
      name: 'João Silva',
      email: 'joao@email.com',
      passwordHash: await hash('123456', 6),
      role: 'AGENT',
    })

    const { user } = await authenticateService.execute({
      email: 'joao@email.com',
      password: '123456',
    })

    expect(user.email).toBe('joao@email.com')
  })

  it('não deve autenticar com email inexistente', async () => {
    await expect(
      authenticateService.execute({
        email: 'inexistente@email.com',
        password: '123456',
      }),
    ).rejects.toThrow('INVALID_CREDENTIALS')
  })

  it('não deve autenticar com senha errada', async () => {
    await usersRepository.items.push({
      id: crypto.randomUUID(),
      name: 'João Silva',
      email: 'joao@email.com',
      passwordHash: await hash('123456', 6),
      role: 'AGENT',
    })

    await expect(
      authenticateService.execute({
        email: 'joao@email.com',
        password: 'senha-errada',
      }),
    ).rejects.toThrow('INVALID_CREDENTIALS')
  })
})