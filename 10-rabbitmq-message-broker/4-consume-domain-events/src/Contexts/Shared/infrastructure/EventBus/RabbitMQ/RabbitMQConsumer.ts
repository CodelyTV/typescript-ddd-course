import { ConsumeMessage } from 'amqplib';
import { DomainEvent } from '../../../domain/DomainEvent';
import { DomainEventSubscriber } from '../../../domain/DomainEventSubscriber';
import { DomainEventDeserializer } from '../DomainEventDeserializer';
import { RabbitMqConnection } from './RabbitMqConnection';


export class RabbitMQConsumer {
  constructor(private subscriber: DomainEventSubscriber<DomainEvent>, private deserializer: DomainEventDeserializer, private connection: RabbitMqConnection) { }

  async onMessage(message: ConsumeMessage) {
    const content = message.content.toString();
    const domainEvent = this.deserializer.deserialize(content);

    try {
      await this.subscriber.on(domainEvent);
      this.connection.ack(message);
    } catch (error) {
      this.connection.noAck(message);
    }
  }
}
