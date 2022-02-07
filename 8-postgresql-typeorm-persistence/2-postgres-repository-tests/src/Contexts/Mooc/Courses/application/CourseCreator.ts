import { CourseId } from '../../Shared/domain/Courses/CourseId';
import { Course } from '../domain/Course';
import { CourseDuration } from '../domain/CourseDuration';
import { CourseName } from '../domain/CourseName';
import { CourseRepository } from '../domain/CourseRepository';
import { CreateCourseRequest } from './CreateCourseRequest';

export class CourseCreator {
  constructor(private repository: CourseRepository) { }

  async run(request: CreateCourseRequest): Promise<void> {
    const course = new Course(new CourseId(request.id), new CourseName(request.name), new CourseDuration(request.duration));
    return this.repository.save(course);
  }
}
