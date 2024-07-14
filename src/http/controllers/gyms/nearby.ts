import { makeGetNearbyGymsUseCase } from '@/usecases/factories/make-get-nearby-gyms-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export const nearby = async (req: FastifyRequest, res: FastifyReply) => {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(req.body)

  const getNearbyGymsUseCase = makeGetNearbyGymsUseCase()

  await getNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return res.status(200).send()
}
