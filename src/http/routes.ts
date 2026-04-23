import type { FastifyInstance } from 'fastify'
import { registerController } from './controllers/register.controller.js'
import { authenticateController } from './controllers/authenticate.controller.js'
import { verifyJwt } from './middlewares/verify-jwt.js'
import { verifyRole } from './middlewares/verify-role.js'
import { createTicketController } from './controllers/create-ticket.controller.js'
import { listTicketsController } from './controllers/list-tickets.controller.js'
import { updateTicketStatusController } from './controllers/update-ticket-status.controller.js'
import { refreshTokenController } from './controllers/refresh-token.controller.js'

export async function appRoutes(app: FastifyInstance){
    app.post('/users', registerController)
    app.post('/sessions', authenticateController)

    app.get('/me', { preHandler: [verifyJwt] }, async (request, reply) => {
         return reply.status(200).send({ userId: request.user.sub })
 })

    app.post(
        '/users/admin',
        {preHandler: [verifyJwt, verifyRole('ADMIN')] },
        async (request, reply) => {
            return reply.status(200).send({message: 'Área restrita ao admin'})
        },
    )
    
    app.post('/tickets', {preHandler: [verifyJwt]}, createTicketController)
    app.get('/tickets', {preHandler: [verifyJwt]}, listTicketsController)
    app.patch('/tickets/:id/status', {preHandler: [verifyJwt, verifyRole('SUPERVISOR')]}, updateTicketStatusController)

    app.patch('/token/refresh', refreshTokenController)
}