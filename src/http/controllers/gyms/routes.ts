import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jew'

import { create } from './create'
import { search } from './search'
import { nearby } from './nearby'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export const gymRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
}
