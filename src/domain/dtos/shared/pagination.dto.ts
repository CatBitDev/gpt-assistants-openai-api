import { assess } from '@/domain/variable-validator'

interface CreatePaginationDtoParams {
  page?: number
  limit?: number
}

export class PaginationDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number
  ) {}

  static create(options: CreatePaginationDtoParams): PaginationDto {
    let { page, limit } = options

    page = assess({ page, default: 1 }).asIntPositive()
    limit = assess({ limit, default: 10 }).asIntPositive()
    return new PaginationDto(page, limit)
  }
}
