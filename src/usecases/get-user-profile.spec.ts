import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Authenticate Use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'João',
      email: 'joaok@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const {
      user: { id, name },
    } = await sut.execute({
      id: createdUser.id,
    })

    expect(id).toEqual(expect.any(String))
    expect(name).toEqual('João')
  })
})
