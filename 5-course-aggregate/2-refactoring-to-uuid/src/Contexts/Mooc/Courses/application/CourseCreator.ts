import { Course } from '../domain/Course';
import { CourseRepository } from '../domain/CourseRepository';
import { CreateCourseRequest } from './CreateCourseRequest';

export class CourseCreator {
  constructor(private repository: CourseRepository) { }

  async run(request: CreateCourseRequest): Promise<void> {
    const course = new Course({ id: request.id, name: request.name, duration: request.duration });
    return this.repository.save(course);
  }
}
