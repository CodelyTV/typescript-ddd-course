import { FileCourseRepository } from '../../../../../../src/Contexts/Mooc/Courses/infrastructure/persistence/FileCourseRepository';
import { CourseMother } from '../../domain/CourseMother';

describe('FileCourseRepository', () => {
  it('should save a course', async () => {
    const repository = new FileCourseRepository();
    const expectedCourse = CourseMother.random();

    await repository.save(expectedCourse);

    
    const course = await repository.search(expectedCourse.id.value);
    expect(course).toEqual(expectedCourse);
  });
});
