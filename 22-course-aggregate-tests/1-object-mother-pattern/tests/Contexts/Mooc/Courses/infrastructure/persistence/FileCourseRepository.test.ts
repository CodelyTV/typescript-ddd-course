import { Course } from '../../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseDuration } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';
import { CourseName } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseName';
import { FileCourseRepository } from '../../../../../../src/Contexts/Mooc/Courses/infrastructure/persistence/FileCourseRepository';
import { CourseId } from '../../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';

describe('Save Course', () => {
  it('should have a course', async () => {
    const repository = new FileCourseRepository();
    const course = new Course({
      id: new CourseId('0766c602-d4d4-48b6-9d50-d3253123275e'),
      name: new CourseName('name'),
      duration: new CourseDuration('duration')
    });

    await repository.save(course);
  });
});
