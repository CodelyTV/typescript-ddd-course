import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseRepositoryMock } from '../__mocks__/CourseRepositoryMock';

describe('CourseCreator', () => {
  let repository: CourseRepositoryMock;

  beforeEach(() => {
    repository = new CourseRepositoryMock();
  });

  it('should create a valid course', async () => {
    const creator = new CourseCreator(repository);
    const id = 'id';
    const name = 'name';
    const duration = '5 hours';
    const expectedCourse = new Course('fakeId', name, duration);

    await creator.run(id, name, duration);

    repository.assertSaveHaveBeenCalledWith(expectedCourse);
  });
});
