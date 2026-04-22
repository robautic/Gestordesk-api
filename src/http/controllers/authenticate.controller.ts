import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { AuthenticateService } from '@/services/authenticate.service.js'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository.js'

export async function authenticateController (
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const authenticateBodySchema = z.object ({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password } =
authenticateBodySchema.parse(request.body)

    const usersRepository = new PrismaUsersRepository()
    const authenticateService = new AuthenticateService (usersRepository)

    try{
        const { user } = await authenticateService.execute ({ email, password })
        
        const token = await reply.jwtSign(
                { role: user.role },
                {sign: { sub: user.id }},
         
        )

        const refreshToken = await reply.jwtSign(
            {role: user.role},
            {sign: { sub: user.id, expiresIn: '7'}},
        )

        return reply
            .setCookie('refreshToken', refreshToken,{
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true,
            })
            .status(200)
            .send({ token })
    } catch (err) {
        console.log(err)
        if (err instanceof Error && err.message === 'INVALID_CREDENTIALS') {
        return reply.status(401).send ({ error: 'Invalid credentials'})
     }
      return reply.status(500).send({ error: 'Internal server error '})
        
    }

}