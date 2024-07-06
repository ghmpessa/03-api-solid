import { FastifyRequest, FastifyReply } from 'fastify'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export const register = async (req: FastifyRequest, res: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    return res.status(409).send()
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })

  return res.status(201).send()
}