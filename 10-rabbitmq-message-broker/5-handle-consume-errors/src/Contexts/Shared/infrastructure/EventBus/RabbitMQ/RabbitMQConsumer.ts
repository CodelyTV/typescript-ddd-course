import { ConsumeMessage } from 'amqplib';
import { DomainEvent } from '../../../domain/DomainEvent';
import { DomainEventSubscriber } from '../../../domain/DomainEventSubscriber';
import { DomainEventDeserializer } from '../DomainEventDeserializer';
export class RabbitMQConsumer {
  private subscriber: DomainEventSubscriber<DomainEvent>;
  private deserializer: DomainEventDeserializer;
  private maxRetries: Number;

  constructor(params: {
    subscriber: DomainEventSubscriber<DomainEvent>;
    deserializer: DomainEventDeserializer;
    maxRetries: Number;
  }) {
    this.subscriber = params.subscriber;
    this.deserializer = params.deserializer;
    this.maxRetries = params.maxRetries;
  }

  async onMessage(params: { message: ConsumeMessage; ack: Function; retry: Function; deadLetter: Function }) {
    const { message, ack, retry, deadLetter } = params;
    const content = message.content.toString();
    const domainEvent = this.deserializer.deserialize(content);

    try {
      await this.subscriber.on(domainEvent);
    } catch (error) {
      this.hasBeenRedeliveredTooMuch(message) ? deadLetter() : retry();
    } finally {
      ack();
    }
  }

  private hasBeenRedeliveredTooMuch(message: ConsumeMessage) {
    if (this.hasBeenRedelivered(message)) {
      const count = parseInt(message.properties.headers['redelivery_count']);
      return count >= this.maxRetries;
    }

    return false;
  }

  private hasBeenRedelivered(message: ConsumeMessage) {
    return message.properties.headers['redelivery_count'] !== undefined;
  }
}
