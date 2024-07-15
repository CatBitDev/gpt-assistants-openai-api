import { PaginationDto } from '@/domain/dtos/shared'
import { Model } from 'mongoose'

export class SearchUseCases {
  public static withPagination<T>(
    model: Model<T>,
    params: { [key: string]: any },
    pagination: PaginationDto
  ) {
    const { page, limit } = pagination
    return Promise.all([
      model.countDocuments().where(params),
      model
        .find(params as any)
        .skip((page - 1) * limit)
        .limit(limit),
    ]).then(([total, modelList]) => {
      const pagination = PaginationDto.create({ page, limit, total })
      return { pagination, modelList }
    })
  }
}
