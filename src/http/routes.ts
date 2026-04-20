import type { FastifyInstance } from 'fastify'
import { registerController } from './controllers/register.controller.js'
import { authenticateController } from './controllers/authenticate.controller.js'
import { verifyJwt } from './middlewares/verify-jwt.js'

export async function appRoutes(app: FastifyInstance){
    app.post('/users', registerController)
    app.post('/sessions', authenticateController)

    app.get('/me', { preHandler: [verifyJwt] }, async (request, reply) => {
         return reply.status(200).send({ userId: request.user.sub })
 })
}