import type { CommentsRepository } from '@/repositories/comments-repository.js'
import type { TicketsRepository } from '@/repositories/tickets-repository.js'

interface CreateCommentServiceRequest {
    content: string 
    userId: string
    ticketId: string
}

interface CreateCommentServiceResponse {
    comment: {
        id: string
        content: string
        userId: string
        ticketId: string
        createdAt: Date
    }
}

export class CreateCommentService {
    constructor(
        private commentsRepository: CommentsRepository,
        private ticketsRepository: TicketsRepository,
    ) {}

    async execute({
        content,
        userId,
        ticketId,
    }: CreateCommentServiceRequest): Promise<CreateCommentServiceResponse> {
      const ticketExists = await this.ticketsRepository.findById(ticketId)

      if(!ticketExists){
        throw new Error('TICKET_NOT_FOUND')
      }

      const comment = await this.commentsRepository.create({
        content,
        userId,
        ticketId,
      })

      return { comment }
    }
}

