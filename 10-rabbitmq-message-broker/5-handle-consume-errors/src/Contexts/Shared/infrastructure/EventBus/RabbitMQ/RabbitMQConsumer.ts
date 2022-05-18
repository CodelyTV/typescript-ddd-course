import { ConsumeMessage } from 'amqplib';
import { DomainEvent } from '../../../domain/DomainEvent';
import { DomainEventSubscriber } from '../../../domain/DomainEventSubscriber';
import { DomainEventDeserializer } from '../DomainEventDeserializer';


export class RabbitMQConsumer {
  constructor(private subscriber: DomainEventSubscriber<DomainEvent>, private deserializer: DomainEventDeserializer) { }

  async onMessage(params: { message: ConsumeMessage; ack: Function; noAck: Function; }) {
    const content = params.message.content.toString();
    const domainEvent = this.deserializer.deserialize(content);

    try {
      await this.subscriber.on(domainEvent);
      params.ack();
    } catch (error) {
      params.noAck();
    }
  }
}
