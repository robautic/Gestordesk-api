export interface CreateTicketData {
    title: string
    description: string
    priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
    createdById: string
}

export interface UpdateTicketStatusData {
    status: 'OPEN' | 'IN_PROGRESS'| 'RESOLVED' | 'CLOSED'
}

export interface TicketsRepository {
    create(data: CreateTicketData): Promise<{
        id: string
        title: string
        description: string
        status: string
        priority: string
        createdById: string
        createdAt: Date
    }>

    findById(id: string): Promise<{
        id: string
        title: string
        description: string
        status: string
        priority: string
        createdById: string | null
        createdAt: Date
    } | null>

    findMany(filters: {createdById?: string }): Promise<{
        id: string
        title: string
        description: string
        status: string
        priority: string
        createdById: string
        createdAt: Date
    }[]>

    updateStatus(id: string, data: UpdateTicketStatusData): Promise<{
        id: string
        status: string 
    }>
}