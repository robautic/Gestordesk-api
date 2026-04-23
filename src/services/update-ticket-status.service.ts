import type { TicketsRepository } from '@/repositories/tickets-repository.js'

interface UpdateTicketsStatusServiceRequest {
    ticketId: string
    status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
}

interface UpdateTicketStatusServiceResponse {
    ticket: {
        id: string
        status: string
    }
}

export class UpdateTicketStatusService {
    constructor(private ticketsRepository: TicketsRepository) {}

    async execute({
        ticketId,
        status,
    }: UpdateTicketsStatusServiceRequest): Promise<UpdateTicketStatusServiceResponse> {
        const ticketExists = await this.ticketsRepository.findById(ticketId)

        if (!ticketExists) {
            throw new Error ('TICKET_NOT_FOUND')
        }

        const ticket = await this.ticketsRepository.updateStatus(ticketId, {
            status,
        })

        return { ticket }
    }
}