import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Nearby Gyms E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: 'gym-02',
        title: 'Skyfit Gym',
        description: null,
        phone: null,
        latitude: -22.217664447052066,
        longitude: -45.91367212243625,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: 'gym-01',
        title: 'Dragons Gym',
        description: null,
        phone: null,
        latitude: -22.2555108,
        longitude: -45.6977071,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -22.216968349625947,
        longitude: -45.923604275554204,
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Skyfit Gym',
      }),
    ])
  })
})
