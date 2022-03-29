import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type CoursesCounterIncrementedAttributes = { total: number };

export class CoursesCounterIncrementedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'courses_counter.incremented';
  readonly total: number;

  constructor(data: { aggregateId: string; total: number; eventId?: string; occurredOn?: Date }) {
    const { aggregateId, eventId, occurredOn } = data;
    super({ eventName: CoursesCounterIncrementedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.total = data.total;
  }

  toPrimitives() {
    return {
      total: this.total,
      eventName: CoursesCounterIncrementedDomainEvent.EVENT_NAME
    };
  }

  static fromPrimitives(params: {
    id: string;
    attributes: CoursesCounterIncrementedAttributes;
    eventId: string;
    occurredOn: Date;
  }) {
    const { id, attributes, eventId, occurredOn } = params;
    return new CoursesCounterIncrementedDomainEvent({
      aggregateId: id,
      total: attributes.total,
      eventId,
      occurredOn
    });
  }
}
