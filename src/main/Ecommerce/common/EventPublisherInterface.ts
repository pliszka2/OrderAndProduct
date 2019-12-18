import { DomainEvent } from './DomainEvent'

export interface EventPublisherInterface {
  publish(events: DomainEvent[]): void
}
