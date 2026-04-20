import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterService } from '@/services/register.service.js'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository.js'

export async function registerController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const registerBodySchema = z.object ({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = 
registerBodySchema.parse(request.body)

    const usersRepository = new PrismaUsersRepository()
    const registerService = new RegisterService (usersRepository)

    try{
        const { user } = await registerService.execute ({ name, email, password })
        return reply.status(201).send ({ user })
    } catch (err) {
        if (err instanceof Error && err.message === 'EMAIL_TAKEN') {
            return reply.status(409).send({ error: 'email already registered'})
        }
        return reply.status(500).send({ error: 'Internal server error'})
    }
}