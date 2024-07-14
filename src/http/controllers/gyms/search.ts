import { makeSearchGymsUseCase } from '@/usecases/factories/make-search-gyms-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export const search = async (req: FastifyRequest, res: FastifyReply) => {
  const searchGymQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymQuerySchema.parse(req.body)

  const searchGymUseCase = makeSearchGymsUseCase()

  const gyms = await searchGymUseCase.execute({
    query,
    page,
  })

  return res.status(200).send({ gyms })
}
