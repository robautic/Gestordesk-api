export interface CreateCommentData {
    content: string
    userId: string
    ticketId: string
}

export interface CommentsRepository {
    create(data: CreateCommentData) : Promise<{
        id: string
        content: string
        userId: string
        ticketId: string
        createdAt: Date
    }>
    }
