import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseRepository } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseRepository';
import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';

describe('CourseCreator', () => {
  it('should create a valid course', async () => {
    const repository: CourseRepository = {
      save: jest.fn()
    };
    const creator = new CourseCreator(repository);
    const id = 'id';
    const name = 'name';
    const duration = '5 hours';
    const expectedCourse = new Course(id, name, duration);

    await creator.run(id, name, duration);

    expect(repository.save).toHaveBeenCalledWith(expectedCourse);
  });
});
