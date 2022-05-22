import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type CreateCourseDomainEventAttributes = {
  readonly duration: string;
  readonly name: string;
  readonly eventName: string;
  readonly id: string;
};

export class CourseCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'course.created';

  readonly duration: string;
  readonly name: string;

  constructor({
    id,
    name,
    duration,
    eventId,
    occurredOn
  }: {
    id: string;
    eventId?: string;
    duration: string;
    name: string;
    occurredOn?: Date;
  }) {
    super({eventName: CourseCreatedDomainEvent.EVENT_NAME, aggregateId: id, eventId, occurredOn});
    this.duration = duration;
    this.name = name;
  }

  toPrimitives(): CreateCourseDomainEventAttributes {
    const { name, duration, aggregateId } = this;
    return {
      name,
      duration,
      eventName: CourseCreatedDomainEvent.EVENT_NAME,
      id: aggregateId
    };
  }

  static fromPrimitives(params: {
    id: string,
    attributes: CreateCourseDomainEventAttributes,
    eventId: string,
    occurredOn: Date
  }): DomainEvent {
    const {id, attributes, occurredOn, eventId} = params;
    return new CourseCreatedDomainEvent({
      id,
      duration: attributes.duration,
      name: attributes.name,
      eventId,
      occurredOn
    });
  }
}
