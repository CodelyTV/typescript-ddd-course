import { Request, Response } from 'express';
import { Controller } from './Controller';

export class CoursePutController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    throw new Error('Method not implemented.');
  }
}
