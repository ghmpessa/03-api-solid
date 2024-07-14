import { makeValidateCheckInUseCase } from '@/usecases/factories/make-validate-check-in-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export const validate = async (req: FastifyRequest, res: FastifyReply) => {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(req.body)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return res.status(204).send()
}
