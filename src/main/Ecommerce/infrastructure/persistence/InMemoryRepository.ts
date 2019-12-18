import { Entity } from '../../common/Entity'

export class InMemoryRepository<T extends Entity> {
  constructor(private items: T[] = []) {}

  public save(itemToSave: T) {
    const alreadyExistingItem = this.items.find(
      item => item.id === itemToSave.id,
    )

    if (alreadyExistingItem) {
      this.items = [
        ...this.items.filter(item => item.id !== alreadyExistingItem.id),
        itemToSave,
      ]

      return Promise.resolve()
    }

    this.items = [...this.items, itemToSave]

    return Promise.resolve()
  }

  public get(itemId: string) {
    const item = this.items.find(item => item.id === itemId)

    return item ? Promise.resolve(item) : Promise.resolve(undefined)
  }

  public delete(itemToRemove: T) {
    this.items = this.items.filter(item => item.id !== itemToRemove.id)

    return Promise.resolve()
  }

  public getAll() {
    return Promise.resolve(this.items)
  }
}
