import { Given } from 'cucumber';
import container from '../../../../../../src/apps/mooc/backend/dependency-injection';
import { EventBus } from '../../../../../../src/Contexts/Shared/domain/EventBus';
import { DomainEventSubscribers } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';
import { DomainEventDeserializer } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventDeserializer';

const eventBus = container.get('Mooc.Shared.domain.EventBus') as EventBus;
const deserializer = buildDeserializer();

Given('I send an event to the event bus:', async (event: any) => {
  const domainEvent = deserializer.deserialize(event);

  await eventBus.publish([domainEvent!]);
});

function buildDeserializer() {
  const subscribers = DomainEventSubscribers.from(container);

  return DomainEventDeserializer.configure(subscribers);
}
