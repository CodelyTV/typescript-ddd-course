import container from '../../../../../src/apps/backoffice/backend/dependency-injection';
import { BackofficeCourse } from '../../../../../src/Contexts/Backoffice/Courses/domain/BackofficeCourse';
import { BackofficeCourseRepository } from '../../../../../src/Contexts/Backoffice/Courses/domain/BackofficeCourseRepository';
import { CourseRepository } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseRepository';
import { CourseMother } from '../../../Mooc/Courses/domain/CourseMother';
import { EnvironmentArranger } from '../../../Shared/infrastructure/arranger/EnvironmentArranger';
import { BackofficeCourseMother } from '../domain/BackofficeCourseMother';

const repository: BackofficeCourseRepository = container.get('Backoffice.Courses.domain.BackofficeCourseRepository');
const moocRepository: CourseRepository = container.get('Mooc.Courses.domain.CourseRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get('Backoffice.EnvironmentArranger');
const moocEnvironmentArranger: Promise<EnvironmentArranger> = container.get('Mooc.EnvironmentArranger');

beforeEach(async () => {
  await (await environmentArranger).arrange();
  await (await moocEnvironmentArranger).arrange();
});

afterEach(async () => {
  await (await environmentArranger).arrange();
  await (await moocEnvironmentArranger).arrange();
});

describe('BackofficeCourseRepository', () => {
  describe('#save', () => {
    it('should be able to persist the same course twice', async () => {
      const course = BackofficeCourseMother.random();

      await repository.save(course);
      await repository.save(course);
    });
  });

  describe('#searchAll', () => {
    it('should return the existing courses', async () => {
      const courses = [CourseMother.random(), CourseMother.random()];

      await Promise.all(courses.map(async course => moocRepository.save(course)));

      const expectedCourses = await repository.searchAll();

      expect(courses).toHaveLength(expectedCourses.length);
      expect(courses.sort(sort)).toEqual(expectedCourses.sort(sort));
    });
  });
});

function sort(backofficeCourse1: BackofficeCourse, backofficeCourse2: BackofficeCourse): number {
  return backofficeCourse1?.id?.value.localeCompare(backofficeCourse2?.id?.value);
}
