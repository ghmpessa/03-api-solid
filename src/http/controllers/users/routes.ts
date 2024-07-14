import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '../../middlewares/verify-jew'

export const usersRoutes = async (app: FastifyInstance) => {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.get(
    '/me',
    {
      onRequest: [verifyJWT],
    },
    profile,
  )
}
