import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { afterAll, beforeAll, describe, it } from 'vitest'
import request from 'supertest'
import { prisma } from '@/lib/prisma'

describe('Create Check-In E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check- in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const { id } = await prisma.gym.create({
      data: {
        title: 'Muscle Gym',
        latitude: -22.2265344,
        longitude: -45.9341824,
      },
    })

    await request(app.server)
      .post(`/gyms/${id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -22.2265344,
        longitude: -45.9341824,
      })
      .expect(201)
  })
})
