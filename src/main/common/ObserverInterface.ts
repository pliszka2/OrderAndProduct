import { DomainEvent } from './DomainEvent'

export interface Observer {
  handleDomainEvent(event: DomainEvent): Promise<void>
}
