import { Request, Response } from 'express';
import { CoursesCounterFinder } from '../../../../Contexts/Mooc/CoursesCounter/application/Find/CoursesCounterFinder';
import { CoursesCounterNotExist } from '../../../../Contexts/Mooc/CoursesCounter/domain/CoursesCounterNotExist';
import { Controller } from './Controller';
import httpStatus from 'http-status';

export class CoursesCounterGetController implements Controller {
  constructor(private coursesCounterFinder: CoursesCounterFinder) {}
  async run(req: Request, res: Response): Promise<void> {
    try {
      const count = await this.coursesCounterFinder.run();

      res.json({ total: count });
    } catch (e) {
      console.log(e)
      if (e instanceof CoursesCounterNotExist) {
        res.sendStatus(httpStatus.NOT_FOUND);
      } else {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
