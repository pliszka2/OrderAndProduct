import { DomainEvent } from '../../common/DomainEvent'
import { EventPublisherInterface } from '../../common/EventPublisherInterface'

export class MockEventPublisher implements EventPublisherInterface {
  private eventList: DomainEvent[] = []

  constructor() {}

  public publish(events: DomainEvent[]) {
    this.eventList = [...this.events, ...events]
  }

  get events() {
    return this.eventList
  }
}
