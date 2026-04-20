import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { env } from '@/env/index.js'
import { appRoutes } from '@/http/routes.js'


export const app = fastify()

app.register(fastifyJwt,{
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false,
    },
    sign: {
        expiresIn: '1h'
    },
})

app.register(fastifyCookie)
app.register (appRoutes)