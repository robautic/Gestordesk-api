import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaTicketsRepository } from '@/repositories/prisma-tickets-repository.js'
import { CreateTicketService } from '@/services/create-ticket.service.js'

export async function createTicketController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const createTicketBodySchema = z.object({
        title: z.string().min(3),
        description: z.string().min(10),
        priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
    })

    const { title, description, priority } = createTicketBodySchema.parse(request.body)

    const createdById = request.user.sub

    const ticketsRepository = new PrismaTicketsRepository()
    const createTicketService = new CreateTicketService(ticketsRepository)

    const { ticket } = await createTicketService.execute({
        title,
        description,
        priority,
        createdById,
    })

    return reply.status(201).send({ticket})
}