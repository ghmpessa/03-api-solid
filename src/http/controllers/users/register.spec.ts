import request from 'supertest'
import { afterAll, beforeAll, describe, it } from 'vitest'
import { app } from '@/app'

describe('Register E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'João Kleber',
        email: 'joaok@gmail.com',
        password: '123456',
      })
      .expect(201)
  })
})
