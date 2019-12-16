import * as uuid from 'uuid'

export enum DomainEventType {
  ItemAdded = 'ItemAdded',
  ItemRemoved = 'ItemRemoved',
}

export abstract class DomainEvent {
  public timestamp: number
  public eventId: string

  constructor(public type: DomainEventType) {
    ;(this.timestamp = Date.now()), (this.eventId = uuid.v1())
  }
}
