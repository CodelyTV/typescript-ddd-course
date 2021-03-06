import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseRepositoryMock } from '../__mocks__/CourseRepositoryMock';
import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';

let repository: CourseRepositoryMock;
let creator: CourseCreator;

beforeEach(() => {
  repository = new CourseRepositoryMock();
  creator = new CourseCreator(repository);
});

describe('CourseCreator', () => {
  it('should create a valid course', async () => {
    const id = '0766c602-d4d4-48b6-9d50-d3253123275e';
    const name = 'some-name';
    const duration = 'some-duration';

    const course = new Course({ id: new CourseId(id), name, duration });

    await creator.run({ id, name, duration });

    repository.assertLastSavedCourseIs(course);
  });
});
