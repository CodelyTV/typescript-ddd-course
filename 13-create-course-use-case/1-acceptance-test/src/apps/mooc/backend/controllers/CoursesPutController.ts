import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from './Controller';

export class CoursesPutController implements Controller {
  async run(req: Request, res: Response): Promise<void> {
    res.send(httpStatus.CREATED).send()
  }
}
