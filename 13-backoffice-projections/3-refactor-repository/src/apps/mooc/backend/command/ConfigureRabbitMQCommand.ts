import { RabbitMQConfig } from '../../../../Contexts/Mooc/Shared/infrastructure/RabbitMQ/RabbitMQConfigFactory';
import { DomainEventSubscribers } from '../../../../Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';
import { RabbitMQConfigurer } from '../../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConfigurer';
import { RabbitMqConnection } from '../../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMqConnection';
import { RabbitMQqueueFormatter } from '../../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQqueueFormatter';
import container from '../dependency-injection';

class ConfigureRabbitMQCommand {
  static async run() {
    const connection = container.get<RabbitMqConnection>('Mooc.Shared.RabbitMQConnection');
    const nameFormatter = container.get<RabbitMQqueueFormatter>('Mooc.Shared.RabbitMQQueueFormatter');
    const { exchangeSettings, retryTtl } = container.get<RabbitMQConfig>('Mooc.Shared.RabbitMQConfig');

    await connection.connect();

    const configurer = new RabbitMQConfigurer(connection, nameFormatter, retryTtl);
    const subscribers = DomainEventSubscribers.from(container).items;

    await configurer.configure({ exchange: exchangeSettings.name, subscribers });
  }
}

ConfigureRabbitMQCommand.run()
  .then(() => {
    console.log('RabbitMQ Configuration success');
    process.exit(0);
  })
  .catch(error => {
    console.log('RabbitMQ Configuration fail', error);
    process.exit(1);
  });
