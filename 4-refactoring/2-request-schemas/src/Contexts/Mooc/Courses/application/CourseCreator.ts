import { Course } from '../domain/Course';
import { CourseRepository } from '../domain/CourseRepository';

export class CourseCreator {
  constructor(private repository: CourseRepository) { }

  async run(id: string, name: string, duration: string) {
    const course = new Course({ id, name, duration });

    return this.repository.save(course);
  }
}
