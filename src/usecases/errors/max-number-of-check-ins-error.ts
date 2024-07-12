export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super('Daily max check-ins reached')
  }
}
