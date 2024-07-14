import { makeCheckInUseCase } from '@/usecases/factories/make-check-in-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export const create = async (req: FastifyRequest, res: FastifyReply) => {
  const createCheckInsParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInsParamsSchema.parse(req.params)

  const { sub: userId } = req.user

  const { latitude, longitude } = createCheckInBodySchema.parse(req.body)

  const createGymUseCase = makeCheckInUseCase()

  await createGymUseCase.execute({
    gymId,
    userId,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return res.status(201).send()
}
