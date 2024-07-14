import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { prisma } from '@/lib/prisma'

describe('Check-In Metrics E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able get check-ins count', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const { id } = await prisma.gym.create({
      data: {
        title: 'Muscle Gym',
        latitude: -22.2265344,
        longitude: -45.9341824,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: id,
          user_id: user.id,
        },
        {
          gym_id: id,
          user_id: user.id,
        },
      ],
    })

    const response = await request(app.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(200)

    expect(response.body.checkInsCount).toEqual(2)
  })
})
