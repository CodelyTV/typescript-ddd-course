import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';
import { CourseRepositoryMock } from '../__mocks__/CourseRepositoryMock';

describe('CourseCreator', () => {
  let repository: CourseRepositoryMock;

  beforeEach(() => {
    repository = new CourseRepositoryMock();
  });

  it('should create a valid course', async () => {
    const creator = new CourseCreator(repository);
    const id = '0766c602-d4d4-48b6-9d50-d3253123275e';
    const name = 'name';
    const duration = '5 hours';
    const expectedCourse = new Course({
      id: new CourseId(id),
      name,
      duration
    });

    await creator.run({ id, name, duration });

    repository.assertSaveHaveBeenCalledWith(expectedCourse);
  });
});
