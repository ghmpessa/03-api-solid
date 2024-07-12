import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search gyms use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to search by gyms', async () => {
    gymsRepository.create({
      id: 'gym-02',
      title: 'Super Gym',
      description: null,
      phone: null,
      latitude: -22.2265344,
      longitude: -45.9341824,
    })

    gymsRepository.create({
      id: 'gym-01',
      title: 'Muscle Gym',
      description: null,
      phone: null,
      latitude: -22.2265344,
      longitude: -45.9341824,
    })

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 1,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Super Gym' }),
      expect.objectContaining({ title: 'Muscle Gym' }),
    ])
  })

  it('should be able get paginated gyms', async () => {
    for (let index = 1; index <= 22; index++) {
      gymsRepository.create({
        id: 'gym-01',
        title: `Muscle Gym ${index}`,
        description: null,
        phone: null,
        latitude: -22.2265344,
        longitude: -45.9341824,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Muscle Gym 21' }),
      expect.objectContaining({ title: 'Muscle Gym 22' }),
    ])
  })
})
