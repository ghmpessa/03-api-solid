import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { GetNearbyGymsUseCase } from './get-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: GetNearbyGymsUseCase

describe('Get nearby gyms use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new GetNearbyGymsUseCase(gymsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to get nearby gyms', async () => {
    gymsRepository.create({
      id: 'gym-02',
      title: 'Skyfit Gym',
      description: null,
      phone: null,
      latitude: -22.217664447052066,
      longitude: -45.91367212243625,
    })

    gymsRepository.create({
      id: 'gym-01',
      title: 'Dragons Gym',
      description: null,
      phone: null,
      latitude: -22.2555108,
      longitude: -45.6977071,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.216968349625947,
      userLongitude: -45.923604275554204,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Skyfit Gym' })])
  })
})
