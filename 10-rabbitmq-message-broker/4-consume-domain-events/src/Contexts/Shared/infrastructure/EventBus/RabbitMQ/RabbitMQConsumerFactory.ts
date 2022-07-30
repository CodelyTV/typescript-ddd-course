import { DomainEvent } from '../../../domain/DomainEvent';
import { DomainEventSubscriber } from '../../../domain/DomainEventSubscriber';
import { DomainEventDeserializer } from '../DomainEventDeserializer';
import { RabbitMqConnection } from './RabbitMqConnection';
import { RabbitMQConsumer } from './RabbitMQConsumer';

export class RabbitMQConsumerFactory {
  constructor(private deserializer: DomainEventDeserializer, private connection: RabbitMqConnection) { }

  build(subscriber: DomainEventSubscriber<DomainEvent>) {
    return new RabbitMQConsumer(subscriber, this.deserializer, this.connection);
  }
}
