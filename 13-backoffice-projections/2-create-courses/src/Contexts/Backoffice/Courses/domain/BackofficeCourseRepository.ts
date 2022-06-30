import { BackofficeCourse } from './BackofficeCourse';

export interface BackofficeCourseRepository {
  save(course: BackofficeCourse): Promise<void>;
  searchAll(): Promise<Array<BackofficeCourse>>;
}
