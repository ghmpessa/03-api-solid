import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { Decimal } from '@prisma/client/runtime/library'
import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In Use case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)

    gymsRepository.create({
      id: 'gym-01',
      title: 'Muscle Gym',
      description: null,
      phone: null,
      latitude: -22.2265344,
      longitude: -45.9341824,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const {
      checkIn: { id },
    } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.2265344,
      userLongitude: -45.9341824,
    })

    expect(id).toEqual(expect.any(String))
  })

  it('should be not able to check in twice on the same day', async () => {
    vi.setSystemTime(new Date(2023, 7, 2, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.2265344,
      userLongitude: -45.9341824,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -22.2265344,
        userLongitude: -45.9341824,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 7, 2, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.2265344,
      userLongitude: -45.9341824,
    })

    vi.setSystemTime(new Date(2023, 7, 3, 8, 0, 0))

    const {
      checkIn: { id },
    } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.2265344,
      userLongitude: -45.9341824,
    })

    expect(id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Muscle Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-22.2177869),
      longitude: new Decimal(-45.9142648),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -22.2265344,
        userLongitude: -45.9341824,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
