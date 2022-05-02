import { DomainEventFailoverPublisher } from '../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventFailoverPublisher/DomainEventFailoverPublisher';
import { RabbitMQConfigurer } from '../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConfigurer';
import { RabbitMqConnection } from '../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMqConnection';
import { RabbitMQEventBus } from '../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQEventBus';
import { RabbitMQqueueFormatter } from '../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQqueueFormatter';
import { CoursesCounterIncrementedDomainEventMother } from '../../../Mooc/CoursesCounter/domain/CoursesCounterIncrementedDomainEventMother';
import { MongoEnvironmentArranger } from '../mongo/MongoEnvironmentArranger';
import { DomainEventDummyMother } from './__mocks__/DomainEventDummy';
import { DomainEventSubscriberDummy } from './__mocks__/DomainEventSubscriberDummy';
import { DomainEventFailoverPublisherMother } from './__mother__/DomainEventFailoverPublisherMother';
import { RabbitMQConnectionMother } from './__mother__/RabbitMQConnectionMother';
import { RabbitMQMongoClientMother } from './__mother__/RabbitMQMongoClientMother';

describe('RabbitMQEventBus test', () => {
  const exchange = 'test_domain_events';
  let arranger: MongoEnvironmentArranger;

  beforeAll(async () => {
    arranger = new MongoEnvironmentArranger(RabbitMQMongoClientMother.create());
  });

  beforeEach(async () => {
    await arranger.arrange();
  });

  afterAll(async () => {
    await arranger.close();
  });

  describe('unit', () => {
    it('should use the failover publisher if publish to RabbitMQ fails', async () => {
      const connection = RabbitMQConnectionMother.failOnPublish();
      const failoverPublisher = DomainEventFailoverPublisherMother.failOverDouble();
      const eventBus = new RabbitMQEventBus({ failoverPublisher, connection, exchange });
      const event = CoursesCounterIncrementedDomainEventMother.create();

      await eventBus.publish([event]);

      failoverPublisher.assertEventHasBeenPublished(event);
    });
  });

  describe('integration', () => {
    let connection: RabbitMqConnection;
    let dummySubscriber: DomainEventSubscriberDummy;
    let configurer: RabbitMQConfigurer;
    let failoverPublisher: DomainEventFailoverPublisher;
    const formatter = new RabbitMQqueueFormatter('mooc');

    beforeAll(async () => {
      connection = await RabbitMQConnectionMother.create();
      failoverPublisher = DomainEventFailoverPublisherMother.create();

      configurer = new RabbitMQConfigurer(connection, formatter);
    });

    beforeEach(async () => {
      await arranger.arrange();
      dummySubscriber = new DomainEventSubscriberDummy();
    });

    afterAll(async () => {
      await cleanEnvironment();
      await connection.close();
    });

    it('should publish events to RabbitMQ', async () => {
      const eventBus = new RabbitMQEventBus({ failoverPublisher, connection, exchange });
      const event = DomainEventDummyMother.random();

      await configurer.configure({ exchange, subscribers: [dummySubscriber] });

      await eventBus.publish([event]);
    });

    async function cleanEnvironment() {
      await connection.deleteQueue(formatter.format(dummySubscriber.constructor.name));
    }
  });
});
