import { DomainEvent, DomainEventClass } from '../../../../../../src/Contexts/Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../../../src/Contexts/Shared/domain/DomainEventSubscriber';
import { DomainEventDummy } from './DomainEventDummy';

export class DomainEventSubscriberDummy implements DomainEventSubscriber<DomainEventDummy> {
  private events: Array<DomainEvent>;

  constructor() {
    this.events = [];
  }

  subscribedTo(): DomainEventClass[] {
    return [DomainEventDummy];
  }

  async on(domainEvent: DomainEventDummy): Promise<void> {
    this.events.push(domainEvent);
  }

  async assertConsumedEvents(events: Array<DomainEvent>) {
    return new Promise((resolve: Function, reject: Function) => {
      setTimeout(() => {
        try {
          expect(this.events).toEqual(events);
          resolve();
        } catch (error: any) {
          reject(error);
        }
      }, 100);
    });
  }
}
