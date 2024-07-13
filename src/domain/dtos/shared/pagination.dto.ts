import { assess } from '@/domain/variable-validator'

interface CreatePaginationDtoParams {
  page?: number
  limit?: number
  total?: number
}

export class PaginationDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly next?: number,
    public readonly previous?: number,
    public readonly total?: number
  ) {}

  static create(options: CreatePaginationDtoParams): PaginationDto {
    let { page, limit, total } = options

    page = assess({ page, default: 1 }).asIntPositive()
    limit = assess({ limit, default: 10 }).asIntPositive()
    total = assess({ total, default: 1 }).asIntPositive()

    let next: number | undefined = page + 1
    let previous: number | undefined = page - 1

    if (next > Math.ceil(total / limit)) {
      next = undefined
    }
    if (previous < 1) {
      previous = undefined
    }

    return new PaginationDto(page, limit, next, previous, total)
  }
}
