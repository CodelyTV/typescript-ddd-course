import { CoursesCounterFinder } from '../../../../../../src/Contexts/Mooc/CoursesCounter/application/Find/CoursesCounterFinder';
import { CoursesCounterNotExist } from '../../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounterNotExist';
import { CoursesCounterMother } from '../../domain/CoursesCounterMother';
import { CoursesCounterRepositoryMock } from '../../__mocks__/CoursesCounterRepositoryMock';

describe('CourseCounterFinder', () => {
  let repository: CoursesCounterRepositoryMock;

  beforeEach(() => {
    repository = new CoursesCounterRepositoryMock();
  });

  it('should find an existing courses counter', async () => {
    const counter = CoursesCounterMother.random();
    repository.returnOnSearch(counter);
    const finder = new CoursesCounterFinder(repository);

    const response = await finder.run();

    repository.assertSearch();
    expect(counter.total.value).toEqual(response);
  });

  it('should throw an exception when courses counter does not exists', async () => {
    const finder = new CoursesCounterFinder(repository);

    await expect(finder.run()).rejects.toBeInstanceOf(CoursesCounterNotExist);
  });
});
