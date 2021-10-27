import { Response, Request, Router } from 'express';
import { CoursesPutController } from '../controllers/CoursesPutController';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const controller: CoursesPutController = container.get('Apps.mooc.controllers.CoursesPutController');
  router.put('/courses/:id', (req: Request, res: Response) => controller.run(req, res));
};
