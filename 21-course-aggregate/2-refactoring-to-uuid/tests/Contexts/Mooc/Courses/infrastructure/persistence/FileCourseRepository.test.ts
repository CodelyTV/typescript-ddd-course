import {Course} from '../../../../../../src/Contexts/Mooc/Courses/domain/Course';
import {FileCourseRepository} from '../../../../../../src/Contexts/Mooc/Courses/infrastructure/persistence/FileCourseRepository';

describe('Save Course', () => {
  it('should have a course', async () => {
    const repository = new FileCourseRepository();
    const course = new Course({id: 'id', name: 'name', duration: 'duration'});

    await repository.save(course);
  });
});
