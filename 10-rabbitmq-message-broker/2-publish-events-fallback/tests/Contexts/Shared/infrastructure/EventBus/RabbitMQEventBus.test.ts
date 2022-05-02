import { RabbitMQConnection } from '../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMqConnection';
import { RabbitMQEventBus } from '../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQEventBus';
import { CoursesCounterIncrementedDomainEventMother } from '../../../Mooc/CoursesCounter/domain/CoursesCounterIncrementedDomainEventMother';
import { MongoEnvironmentArranger } from '../mongo/MongoEnvironmentArranger';
import { DomainEventFailoverPublisherMother } from './__mother__/DomainEventFailoverPublisherMother';
import { RabbitMQConnectionMother } from './__mother__/RabbitMQConnectionMother';
import { RabbitMQMongoClientMother } from './__mother__/RabbitMQMongoClientMother';

describe('RabbitMQEventBus test', () => {
  const exchange = 'amq.topic';
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
    let connection: RabbitMQConnection;

    beforeAll(async () => {
      connection = await RabbitMQConnectionMother.create();
    });

    afterAll(async () => {
      await connection.close();
    });


    it('should publish events to RabbitMQ', async () => {
      const failoverPublisher = DomainEventFailoverPublisherMother.create();
      const eventBus = new RabbitMQEventBus({ failoverPublisher, connection, exchange });

      await eventBus.publish([CoursesCounterIncrementedDomainEventMother.create()]);
    });
  });
});
