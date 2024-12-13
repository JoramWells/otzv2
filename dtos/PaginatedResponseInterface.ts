export interface PaginatedResponseInterface<T> {
  data: T[]
  page: number
  total: number
  pageSize: string | number
}

export interface DefaultParamsInterface {
  hospitalID: string
  page: number
  pageSize: number
  searchQuery: string
}
