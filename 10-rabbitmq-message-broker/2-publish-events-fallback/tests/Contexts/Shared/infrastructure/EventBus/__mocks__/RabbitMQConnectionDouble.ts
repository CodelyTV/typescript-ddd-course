import { RabbitMQConnection } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMqConnection';

export class RabbitMQConnectionDouble extends RabbitMQConnection {

  async publish(params: any): Promise<boolean> {
    throw new Error();
  }
}
