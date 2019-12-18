import { DomainEvent } from '../../common/DomainEvent'
import { Observer } from '../../common/ObserverInterface'
import { EventPublisherInterface } from '../../common/EventPublisherInterface'

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
