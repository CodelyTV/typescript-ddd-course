import { Router, Request, Response } from 'express';
import StatusController from '../controllers/StatusGetController';

export const register = (router: Router) => {
  const controller: StatusController = new StatusController();
  router.get('/status', (req: Request, res: Response) => controller.run(req, res));
};
