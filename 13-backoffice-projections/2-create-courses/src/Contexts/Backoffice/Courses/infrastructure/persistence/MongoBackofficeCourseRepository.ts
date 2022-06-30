import { MongoClient } from 'mongodb';
import { CoursesResponse } from '../../../../Mooc/Courses/application/SearchAll/CoursesResponse';
import { SearchAllCoursesQuery } from '../../../../Mooc/Courses/application/SearchAll/SearchAllCoursesQuery';
import { QueryBus } from '../../../../Shared/domain/QueryBus';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { BackofficeCourse } from '../../domain/BackofficeCourse';
import { BackofficeCourseRepository } from '../../domain/BackofficeCourseRepository';

export class MongoBackofficeCourseRepository
  extends MongoRepository<BackofficeCourse>
  implements BackofficeCourseRepository
{
  constructor(client: Promise<MongoClient>, private readonly queryBus: QueryBus) {
    super(client);
  }

  public save(course: BackofficeCourse): Promise<void> {
    return this.persist(course.id.value, course);
  }

  protected collectionName(): string {
    return 'backoffice_courses';
  }

  public async searchAll(): Promise<BackofficeCourse[]> {
    const courses = await this.queryBus.ask<CoursesResponse>(new SearchAllCoursesQuery());

    return courses.courses.map(course =>
      BackofficeCourse.fromPrimitives({ name: course.name, duration: course.duration, id: course.id })
    );
  }
}
