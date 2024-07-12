/* eslint-disable prettier/prettier */
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface GetUserCheckInsHistoryUseCaseRequest {
  userId: string
}

interface GetUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class GetUserCheckInsHistoryUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository
  ) { }

  async execute({
    userId,
  }: GetUserCheckInsHistoryUseCaseRequest): Promise<GetUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId)

    return {
      checkIns,
    }
  }
}
