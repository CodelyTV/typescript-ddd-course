import { DomainEvent } from '../../../domain/DomainEvent';
import { EventBus } from '../../../domain/EventBus';
import { DomainEventSubscribers } from '../DomainEventSubscribers';
import { DomainEventJsonSerializer } from '../DomainEventJsonSerializer';
import { RabbitMQConnection } from './RabbitMqConnection';
import { DomainEventFailoverPublisher } from '../DomainEventFailoverPublisher/DomainEventFailoverPublisher';

export class RabbitMQEventBus implements EventBus {
  private failoverPublisher: DomainEventFailoverPublisher;
  private connection: RabbitMQConnection;
  private exchange: string;

  constructor(params: {
    failoverPublisher: DomainEventFailoverPublisher;
    connection: RabbitMQConnection;
    exchange: string;
  }) {
    const { failoverPublisher, connection, exchange } = params;
    this.failoverPublisher = failoverPublisher;
    this.connection = connection;
    this.exchange = exchange;
  }

  addSubscribers(subscribers: DomainEventSubscribers): void {
    throw new Error('Method not implemented.');
  }

  async publish(events: Array<DomainEvent>): Promise<void> {
    for (const event of events) {
      try {
        const routingKey = event.eventName;
        const content = this.toBuffer(event);
        const options = this.options(event);

        await this.connection.publish({ exchange: this.exchange, routingKey, content, options });
      } catch (error: any) {
        await this.failoverPublisher.publish(event);
      }
    }
  }

  private options(event: DomainEvent) {
    return {
      messageId: event.eventId,
      contentType: 'application/json',
      contentEncoding: 'utf-8'
    };
  }

  private toBuffer(event: DomainEvent): Buffer {
    const eventPrimitives = DomainEventJsonSerializer.serialize(event);

    return Buffer.from(eventPrimitives);
  }
}
