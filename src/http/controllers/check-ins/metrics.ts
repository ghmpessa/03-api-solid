import { makeGetUserMetricsUseCase } from '@/usecases/factories/make-get-user-metrics-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export const metrics = async (req: FastifyRequest, res: FastifyReply) => {
  const { sub: userId } = req.user

  const getUserMetricsUseCase = makeGetUserMetricsUseCase()

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId,
  })

  return res.status(200).send({ checkInsCount })
}
