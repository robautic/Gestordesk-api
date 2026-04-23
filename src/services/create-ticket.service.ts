import type { TicketsRepository } from "@/repositories/tickets-repository.js"

interface CreateTicketServiceRequest {
    title: string
    description: string
    priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
    createdById: string
}

interface CreateTicketServiceResponse {
    ticket: {
        id: string
        title: string
        description: string
        status: string
        priority: string
        createdById: string
        createdAt: Date
    }
}

export class CreateTicketService{
    constructor(private ticketsRepository: TicketsRepository ) {}

    async execute({
        title,
        description,
        priority,
        createdById,
    }: CreateTicketServiceRequest ): Promise<CreateTicketServiceResponse> {
        const ticket = await this.ticketsRepository.create({
            title,
            description,
            priority,
            createdById,
        })

        return { ticket }
    }
}