import type {FastifyRequest, FastifyReply} from 'fastify'
import {z} from 'zod'
import { PrismaCommentsRepository } from '@/repositories/prisma-comments-repository.js'
import { PrismaTicketsRepository } from '@/repositories/prisma-tickets-repository.js'
import {CreateCommentService} from '@/services/create-comment.service.js'

export async function createCommentController (
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const createCommentParamsSchema = z.object({
        id: z.string().uuid(),
    })

    const createCommentBodySchema = z.object({
        content: z.string().min(3),
    })

    const {id} = createCommentParamsSchema.parse(request.params)
    const {content} = createCommentBodySchema.parse(request.body)

    const userId = request.user.sub

    const commentsRepository = new PrismaCommentsRepository()
    const ticketsRepository = new PrismaTicketsRepository()
    const createCommentService =  new CreateCommentService(commentsRepository, ticketsRepository)

    try {
        const {comment} = await createCommentService.execute({
            content,
            userId,
            ticketId: id,
        })

        return reply.status(201).send({comment})
    }   catch (err) {
        if (err instanceof Error && err.message === 'TICKET_NOT_FOUND') {
            return reply.status(404).send({error: 'ticket not found'})

        }

        return reply.status(500).send({error: 'internal server error'})
    }
}
