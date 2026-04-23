import type { TicketsRepository } from '@/repositories/tickets-repository.js'

interface ListTicketsServiceRequest {
    userId: string
    userRole: 'AGENT' | 'SUPERVISOR' | 'ADMIN'

}

interface ListTicketsServiceResponse {
    tickets: {
        id: string
        title: string
        description: string
        status: string
        priority: string
        createdById: string
        createdAt: Date
    } []
}

export class ListTicketsService {
    constructor (private ticketsRepository: TicketsRepository) {}
    
    async execute ({
        userId,
        userRole,
    }: ListTicketsServiceRequest ): Promise<ListTicketsServiceResponse>{

        const isAgent = userRole === 'AGENT'
        const tickets = await this.ticketsRepository.findMany({
            createdById: isAgent ? userId : undefined,
        })
        return {tickets}
    }
 }
