/* eslint-disable prettier/prettier */
import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface GetNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface GetNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class GetNearbyGymsUseCase {
  constructor(private readonly gymRepository: GymsRepository) { }

  async execute({
    userLatitude,
    userLongitude,
  }: GetNearbyGymsUseCaseRequest): Promise<GetNearbyGymsUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
