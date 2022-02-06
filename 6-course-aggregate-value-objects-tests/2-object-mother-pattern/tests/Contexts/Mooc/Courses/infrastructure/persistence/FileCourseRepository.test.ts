import { Course } from '../../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseDuration } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';
import { CourseName } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseName';
import { FileCourseRepository } from '../../../../../../src/Contexts/Mooc/Courses/infrastructure/persistence/FileCourseRepository';
import { CourseId } from '../../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';

describe('FileCourseRepository', () => {
  it('should save a course', async () => {
    const repository = new FileCourseRepository();
    const expectedCourse = new Course({
      id: new CourseId('0766c602-d4d4-48b6-9d50-d3253123275e'),
      name: new CourseName('name'),
      duration: new CourseDuration('duration')
    });

    await repository.save(expectedCourse);

    const course = await repository.search('0766c602-d4d4-48b6-9d50-d3253123275e');
    expect(course).toEqual(expectedCourse);
  });
});
