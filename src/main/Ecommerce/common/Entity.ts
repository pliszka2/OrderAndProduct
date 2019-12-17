import { DomainEvent } from './DomainEvent'

export abstract class Entity {
  public id: string
  protected domainEvents: DomainEvent[]

  constructor(id: string) {
    this.id = id
    this.domainEvents = []
  }

  public getEvents() {
    return this.domainEvents
  }

  public flushEvents() {
    this.domainEvents = []
  }
}
