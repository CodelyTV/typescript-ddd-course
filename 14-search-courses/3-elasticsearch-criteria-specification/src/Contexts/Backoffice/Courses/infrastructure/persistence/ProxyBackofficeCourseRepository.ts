import { Criteria } from '../../../../Shared/domain/criteria/Criteria';
import { BackofficeCourse } from '../../domain/BackofficeCourse';
import { BackofficeCourseRepository } from '../../domain/BackofficeCourseRepository';

export class ProxyBackofficeCourseRepository implements BackofficeCourseRepository {
  constructor(
    private readonly currentRepository: BackofficeCourseRepository,
    private readonly targetRepository: BackofficeCourseRepository
  ) {}

  async searchAll(): Promise<BackofficeCourse[]> {
    return this.currentRepository.searchAll();
  }

  async save(course: BackofficeCourse): Promise<void> {
    void this.targetRepository.save(course);
    return this.currentRepository.save(course);
  }

  async matching(criteria: Criteria): Promise<BackofficeCourse[]> {
    return this.currentRepository.matching(criteria);
  }
}
