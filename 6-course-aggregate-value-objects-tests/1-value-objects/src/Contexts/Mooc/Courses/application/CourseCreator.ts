import { CourseId } from '../../Shared/domain/Courses/CourseId';
import { Course } from '../domain/Course';
import { CourseRepository } from '../domain/CourseRepository';
import { CreateCourseRequest } from './CreateCourseRequest';

export class CourseCreator {
  constructor(private repository: CourseRepository) { }

  async run(request: CreateCourseRequest): Promise<void> {
    const course = new Course({ id: new CourseId(request.id), name: request.name, duration: request.duration });
    return this.repository.save(course);
  }
}
