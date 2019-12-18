export interface AbstractRepositoryInterface<T> {
  save(record: T): Promise<void>
  get(recordId: string): Promise<T | undefined>
  delete(record: T): Promise<void>
  getAll(): Promise<Array<T>>
}
