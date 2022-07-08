import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { BackofficeCourse } from '../../domain/BackofficeCourse';
import { BackofficeCourseRepository } from '../../domain/BackofficeCourseRepository';

interface CourseDocument {
  _id: string;
  name: string;
  duration: string;
};

export class MongoBackofficeCourseRepository
  extends MongoRepository<BackofficeCourse>
  implements BackofficeCourseRepository
{
  public save(course: BackofficeCourse): Promise<void> {
    return this.persist(course.id.value, course);
  }

  protected collectionName(): string {
    return 'backoffice_courses';
  }

  public async searchAll(): Promise<BackofficeCourse[]> {
    const collection = await this.collection();
    const documents = await collection.find<CourseDocument>({}).toArray();

    return documents.map(document =>
      BackofficeCourse.fromPrimitives({ name: document.name, duration: document.duration, id: document._id })
    );
  }
}
