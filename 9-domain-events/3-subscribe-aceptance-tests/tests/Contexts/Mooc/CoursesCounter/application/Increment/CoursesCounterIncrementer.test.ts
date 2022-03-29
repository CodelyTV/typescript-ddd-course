import { CoursesCounterIncrementer } from '../../../../../../src/Contexts/Mooc/CoursesCounter/application/Increment/CoursesCounterIncrementer';
import { CoursesCounter } from '../../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounter';
import EventBusMock from '../../../Courses/__mocks__/EventBusMock';
import { CourseIdMother } from '../../../Shared/domain/Courses/CourseIdMother';
import { CoursesCounterIncrementedDomainEventMother } from '../../domain/CoursesCounterIncrementedDomainEventMother';
import { CoursesCounterMother } from '../../domain/CoursesCounterMother';
import { CoursesCounterRepositoryMock } from '../../__mocks__/CoursesCounterRepositoryMock';

describe('CoursesCounter Incrementer', () => {
  let incrementer: CoursesCounterIncrementer;
  let eventBus: EventBusMock;
  let repository: CoursesCounterRepositoryMock;

  beforeEach(() => {
    eventBus = new EventBusMock();
    repository = new CoursesCounterRepositoryMock();
    incrementer = new CoursesCounterIncrementer(repository, eventBus);
  });

  it('should initialize a new counter', async () => {
    const courseId = CourseIdMother.random();
    const counter = CoursesCounterMother.withOne(courseId);

    await incrementer.run(courseId);

    repository.assertLastCoursesCounterSaved(counter);
  });

  it('should increment an existing counter', async () => {
    const existingCounter = CoursesCounterMother.random();
    repository.returnOnSearch(existingCounter);
    const courseId = CourseIdMother.random();
    const expected = CoursesCounter.fromPrimitives(existingCounter.toPrimitives());
    expected.increment(courseId);
    const expectedEvent = CoursesCounterIncrementedDomainEventMother.fromCourseCounter(expected);

    await incrementer.run(courseId);

    repository.assertLastCoursesCounterSaved(expected);
    eventBus.assertLastPublishedEventIs(expectedEvent);
  });
});
