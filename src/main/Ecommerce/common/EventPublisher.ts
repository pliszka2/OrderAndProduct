import { DomainEvent } from './DomainEvent'
import { Observer } from './ObserverInterface'

export interface EventPublisherInterface {
  publish(events: DomainEvent[]): void
}

export class EventPublisher implements EventPublisherInterface {
  constructor(private observers: Observer[]) {}

  public publish(events: DomainEvent[]) {
    for (const event of events) {
      this.notify(event)
    }
  }

  private notify(event: DomainEvent) {
    for (const observer of this.observers) {
      observer.handleDomainEvent(event)
    }
  }
}
