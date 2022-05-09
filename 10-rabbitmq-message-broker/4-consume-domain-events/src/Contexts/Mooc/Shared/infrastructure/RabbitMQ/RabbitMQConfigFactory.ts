import { ConnectionSettings } from '../../../../Shared/infrastructure/EventBus/RabbitMQ/ConnectionSettings';
import { ExchangeSetting } from '../../../../Shared/infrastructure/EventBus/RabbitMQ/ExchangeSetting';
import config from '../config';

export class RabbitMQConfigFactory {
  static createConfig(): { connectionSettings: ConnectionSettings; exchangeSettings: ExchangeSetting } {
    return config.get('rabbitmq');
  }
}
