import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { beforeEach, describe, expect, it, afterEach } from 'vitest'
import { ValidateCheckInUseCase } from './validate-check-in'

let checkInRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check In Use case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInRepository)

    // vi.useFakeTimers()
  })

  afterEach(() => {
    // vi.useRealTimers()
  })

  it('should be able to validate check-in', async () => {
    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })
})
