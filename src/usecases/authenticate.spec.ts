import { describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'

describe('Authenticate Use case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'João',
      email: 'joaok@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const {
      user: { id },
    } = await sut.execute({
      email: 'joaok@gmail.com',
      password: '123456',
    })

    expect(id).toEqual(expect.any(String))
  })
})
