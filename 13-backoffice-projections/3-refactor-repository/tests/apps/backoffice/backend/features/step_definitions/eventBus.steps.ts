import { Given } from 'cucumber';
import container from '../../../../../../src/apps/backoffice/backend/dependency-injection';
import { EventBus } from '../../../../../../src/Contexts/Shared/domain/EventBus';
import { DomainEventDeserializer } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventDeserializer';
import { DomainEventSubscribers } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';

const eventBus = container.get('Backoffice.Shared.domain.EventBus') as EventBus;
const deserializer = buildDeserializer();

Given('the following event is received:', async (event: any) => {
  const domainEvent = deserializer.deserialize(event)!;
  await eventBus.publish([domainEvent]);
});

function buildDeserializer() {
  const subscribers = DomainEventSubscribers.from(container);
  return DomainEventDeserializer.configure(subscribers);

}
