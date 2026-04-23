import type { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaTicketsRepository } from '@/repositories/prisma-tickets-repository.js'
import { ListTicketsService } from '@/services/list-tickets.service.js'

export async function listTicketsController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const userId = request.user.sub
    const userRole = request.user.role as 'AGENT'| 'SUPERVISOR'| 'ADMIN'

    const ticketsRepository = new PrismaTicketsRepository()
    const listTicketsService = new ListTicketsService(ticketsRepository)

    const { tickets } = await listTicketsService.execute ({
        userId,
        userRole,
    })

    return reply.status(200).send({tickets})
}