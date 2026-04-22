import type { FastifyRequest, FastifyReply } from 'fastify'

type Role = 'AGENT' | 'SUPERVISOR' | 'ADMIN'

export function verifyRole(roleToVerify: Role) {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        const { role } = request.user as { role: Role }

        if (role !== roleToVerify) {
            return reply.status(403).send({message: 'Forbidden'})
        }
    }
}