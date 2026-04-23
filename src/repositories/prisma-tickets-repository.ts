import { prisma } from '@/lib/prisma.js'
import type {CreateTicketData, UpdateTicketStatusData, TicketsRepository } from './tickets-repository.js'

export class PrismaTicketsRepository implements TicketsRepository {
    async create(data: CreateTicketData) {
        const ticket = await prisma.ticket.create({
            data: {
                title: data.title,
                description: data.description,
                priority: data.priority,
                createdById: data.createdById,
            },
        })

        return ticket
    }

    async findById(id: string){
        const ticket = await prisma.ticket.findUnique({
            where: { id },
        })

        return ticket
    }
    
    async findMany(filters: { createdById?: string }) {
        const tickets = await prisma.ticket.findMany({
            where: {
                createdById: filters.createdById,
            },
        })

        return tickets
    }

    async updateStatus(id: string, data: UpdateTicketStatusData) {
        const ticket = await prisma.ticket.update({
            where: { id },
            data: { status: data.status },
        })

        return ticket
    }
}