import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Profile E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'João Kleber',
      email: 'joaok@gmail.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'joaok@gmail.com',
      password: '123456',
    })

    const {
      body: { token },
    } = authResponse

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: 'joaok@gmail.com',
      }),
    )
  })
})
