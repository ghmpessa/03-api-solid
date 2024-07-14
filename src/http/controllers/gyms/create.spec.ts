import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { afterAll, beforeAll, describe, it } from 'vitest'
import request from 'supertest'

describe('Create gym E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Muscle Gym',
        description: 'get muscles',
        phone: '35999990202',
        latitude: -22.2265344,
        longitude: -45.9341824,
      })
      .expect(201)
  })
})
