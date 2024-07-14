import { makeGetUserCheckInsHistoryUseCase } from '@/usecases/factories/make-get-user-check-ins-history-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export const history = async (req: FastifyRequest, res: FastifyReply) => {
  const checkInsHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInsHistoryQuerySchema.parse(req.query)

  const { sub: userId } = req.user

  const getUserCheckInsHistoryUseCase = makeGetUserCheckInsHistoryUseCase()

  const { checkIns } = await getUserCheckInsHistoryUseCase.execute({
    userId,
    page,
  })

  return res.status(200).send({ checkIns })
}
