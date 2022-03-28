import { Definition } from 'node-dependency-injection';
import { DomainEvent } from '../../../Contexts/Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../Contexts/Shared/domain/DomainEventSubscriber';
import { EventBus } from '../../../Contexts/Shared/domain/EventBus';
import container from './dependency-injection';
import { Server } from './server';

export class MoocBackendApp {
  server?: Server;

  async start() {
    const port = process.env.PORT || '5000';
    this.server = new Server(port);

    await this.configureEventBus();

    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    return this.server?.stop();
  }

  private async configureEventBus() {
    const eventBus = container.get<EventBus>('Mooc.Shared.domain.EventBus');

    eventBus.addSubscribers(this.findSubscribers());
  }

  private findSubscribers(): Array<DomainEventSubscriber<DomainEvent>> {
    const subscriberDefinitions = container.findTaggedServiceIds('domainEventSubscriber') as Map<String, Definition>;
    const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

    subscriberDefinitions.forEach((value: Definition, key: String) => {
      const domainEventSubscriber = container.get<DomainEventSubscriber<DomainEvent>>(key.toString());
      subscribers.push(domainEventSubscriber);
    });

    return subscribers;
  }
}
