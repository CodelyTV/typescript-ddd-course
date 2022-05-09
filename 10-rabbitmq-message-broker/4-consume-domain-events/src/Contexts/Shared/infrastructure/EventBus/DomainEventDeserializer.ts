import { DomainEventClass } from '../../domain/DomainEvent';
import { DomainEventSubscribers } from './DomainEventSubscribers';

export class DomainEventDeserializer extends Map<string, DomainEventClass> {
  static configure(subscribers: DomainEventSubscribers) {
    const mapping = new DomainEventDeserializer();
    subscribers.items.forEach(subscriber => {
      subscriber.subscribedTo().forEach(mapping.registerEvent.bind(mapping));
    });

    return mapping;
  }

  private registerEvent(domainEvent: DomainEventClass) {
    const eventName = domainEvent.EVENT_NAME;
    this.set(eventName, domainEvent);
  }

  deserialize(event: string) {
    const eventData = JSON.parse(event).data;
    const eventName = eventData.type;
    const eventClass = super.get(eventName);

    if (!eventClass) {
      return;
    }

    return eventClass.fromPrimitives({
      id: eventData.attributes.id,
      attributes: eventData.attributes,
      occurredOn: new Date(eventData.occurred_on),
      eventId: eventData.id
    });
  }
}
