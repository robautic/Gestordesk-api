import '@fastify/jwt'
import '@fastify/cookie'

declare module '@fastify/jwt' {
    interface FastifyJWT {
        user: {
            sub: string
            role: 'AGENT' | 'SUPERVISOR' | 'ADMIN'
        }
    }
}

declare module 'fastify' {
    interface FastifyReply {
        jwtSign(
            payload: object,
            options?: {sign?: { sub?: string; expiresIn?: string}},
         ): Promise<string>
       
    }
}