import amqplib, { ConsumeMessage } from 'amqplib';
import { ConnectionSettings } from './ConnectionSettings';
import { ExchangeSetting } from './ExchangeSetting';
import { RabbitMQConsumer } from './RabbitMQConsumer';
export class RabbitMqConnection {
  protected connectionSettings: ConnectionSettings;

  protected channel?: amqplib.ConfirmChannel;
  protected connection?: amqplib.Connection;

  constructor(params: { connectionSettings: ConnectionSettings; exchangeSettings: ExchangeSetting }) {
    this.connectionSettings = params.connectionSettings;
  }

  async connect() {
    this.connection = await this.amqpConnect();
    this.channel = await this.amqpChannel();
  }

  async exchange(params: { name: string }) {
    return await this.channel?.assertExchange(params.name, 'topic', { durable: true });
  }

  async queue(params: { exchange: string; name: string; routingKeys: string[] }) {
    const durable = true;
    const exclusive = false;
    const autoDelete = false;

    await this.channel?.assertQueue(params.name, {
      exclusive,
      durable,
      autoDelete
    });
    for (const routingKey of params.routingKeys) {
      await this.channel!.bindQueue(params.name, params.exchange, routingKey);
    }
  }

  async consume(queue: string, consumer: RabbitMQConsumer) {
    await this.channel!.consume(queue, (message: ConsumeMessage | null) => {
      if (!message) {
        return;
      }

      const ack = this.getAck(message);
      const noAck = this.getNoAck(message);
      consumer.onMessage({ message, ack, noAck });
    });
  }

  async deleteQueue(queue: string) {
    return await this.channel!.deleteQueue(queue);
  }

  private async amqpConnect() {
    const { hostname, port, secure } = this.connectionSettings.connection;
    const { username, password, vhost } = this.connectionSettings;
    const protocol = secure ? 'amqps' : 'amqp';

    const connection = await amqplib.connect({
      protocol,
      hostname,
      port,
      username,
      password,
      vhost
    });

    connection.on('error', (err: any) => {
      Promise.reject(err);
    });

    return connection;
  }

  private async amqpChannel(): Promise<amqplib.ConfirmChannel> {
    const channel = await this.connection!.createConfirmChannel();
    await channel.prefetch(1);

    return channel;
  }

  async publish(params: {
    exchange: string;
    routingKey: string;
    content: Buffer;
    options: { messageId: string; contentType: string; contentEncoding: string };
  }) {
    const { routingKey, content, options, exchange } = params;
    return new Promise((resolve: Function, reject: Function) => {
      this.channel!.publish(exchange, routingKey, content, options, (error: any) =>
        error ? reject(error) : resolve()
      );
    });
  }

  async close() {
    await this.channel?.close();
    return await this.connection?.close();
  }

  private getAck(message: ConsumeMessage) {
    return () => {
      this.channel!.ack(message);
    };
  }

  private getNoAck(message: ConsumeMessage) {
    return () => {
      this.channel!.nack(message);
    };
  }
}
