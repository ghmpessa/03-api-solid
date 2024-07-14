import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jew'
import { create } from './create'

export const gymRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms', create)
}
