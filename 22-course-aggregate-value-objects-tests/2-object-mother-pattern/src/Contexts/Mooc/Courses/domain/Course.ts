import { CourseId } from '../../Shared/domain/Courses/CourseId';
import { CourseDuration } from './CourseDuration';
import { CourseName } from './CourseName';

export class Course {
  readonly id: CourseId;
  readonly name: CourseName;
  readonly duration: CourseDuration;

  constructor({ id, name, duration }: { id: CourseId; name: CourseName; duration: CourseDuration }) {
    this.id = id;
    this.name = name;
    this.duration = duration;
  }
}
