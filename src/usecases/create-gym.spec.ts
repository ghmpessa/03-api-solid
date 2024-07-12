import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const {
      gym: { id },
    } = await sut.execute({
      title: 'Academia braba',
      description: null,
      phone: null,
      latitude: -22.2265344,
      longitude: -45.9341824,
    })

    expect(id).toEqual(expect.any(String))
  })
})
