import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jew'
import { create } from './create'
import { history } from './history'
import { metrics } from './metrics'
import { validate } from './validate'

export const checkInsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms/:gymId/check-ins', create)
  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)
  app.post('/check-ins/:checkInId/validate', validate)
}