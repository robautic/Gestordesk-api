import { prisma } from '@/lib/prisma.js'
import type { CreateCommentData, CommentsRepository } from './comments-repository.js'

export class PrismaCommentsRepository implements CommentsRepository {
    async create(data: CreateCommentData) {
        const comment = await prisma.comment.create({
            data: {
                content: data.content,
                userId: data.userId,
                ticketId: data.ticketId,
            },
            select: {
                id: true,
                content: true,
                userId: true,
                ticketId: true,
                createdAt: true,
            },    
        })

        return comment 
    }
}