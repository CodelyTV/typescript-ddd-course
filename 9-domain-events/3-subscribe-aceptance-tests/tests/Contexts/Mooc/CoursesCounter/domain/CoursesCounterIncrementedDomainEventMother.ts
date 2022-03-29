import { CoursesCounter } from '../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounter';
import { CoursesCounterIncrementedDomainEvent } from '../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounterIncrementedDomainEvent';

export class CoursesCounterIncrementedDomainEventMother {
  static fromCourseCounter(counter: CoursesCounter): CoursesCounterIncrementedDomainEvent {
    return new CoursesCounterIncrementedDomainEvent({
      aggregateId: counter.id.value,
      total: counter.total.value
    });
  }
}
