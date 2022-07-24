import moocConfig from '../../../../Contexts/Mooc/Shared/infrastructure/config';
import { DomainEventSubscribers } from '../../../../Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';
import { RabbitMQConfigurer } from '../../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConfigurer';
import { RabbitMqConnection } from '../../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMqConnection';
import { RabbitMQqueueFormatter } from '../../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQqueueFormatter';
import container from '../dependency-injection';

export class ConfigureRabbitMQCommand {
  static async run() {
    const connection = container.get<RabbitMqConnection>('Mooc.Shared.RabbitMQConnection');
    await connection.connect();

    const nameFormatter = container.get<RabbitMQqueueFormatter>('Mooc.Shared.RabbitMQQueueFormatter');
    const configurer = new RabbitMQConfigurer(connection, nameFormatter);
    const subscribers = DomainEventSubscribers.from(container).items;
    const exchange = moocConfig.get('rabbitmq').exchangeSettings.name;

    await configurer.configure({ exchange, subscribers });
    await connection.close();
  }
}
