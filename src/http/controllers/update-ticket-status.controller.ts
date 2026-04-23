import type {FastifyRequest, FastifyReply} from 'fastify'
import { z } from 'zod'
import { PrismaTicketsRepository } from '@/repositories/prisma-tickets-repository.js'
import { UpdateTicketStatusService } from '@/services/update-ticket-status.service.js'

export async function updateTicketStatusController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const updateTicketStatusParamsSchema = z.object({
        id: z.string().uuid(),
    })

    const updateTicketStatusBodySchema = z.object ({
        status: z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']),
    })

    const { id } = updateTicketStatusParamsSchema.parse(request.params)
    const { status } = updateTicketStatusBodySchema.parse(request.body)

    const ticketsRepository = new PrismaTicketsRepository()
    const updateTicketStatusService = new UpdateTicketStatusService(ticketsRepository)

    try {
        const {ticket} = await updateTicketStatusService.execute({
            ticketId: id,
            status,    
        })
        return reply.status(200).send({ticket})
    } catch (err) {
      if (err instanceof Error && err.message === 'TICKET_NOT_FOUND') {
        return reply.status(404).send({ error: 'Ticket not found' })
      } 
      return reply.status(500).send({error: 'internal server error'}) 
    }
}