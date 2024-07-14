import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jew'

import { create } from './create'
import { search } from './search'
import { nearby } from './nearby'

export const gymRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms', create)
  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
}
