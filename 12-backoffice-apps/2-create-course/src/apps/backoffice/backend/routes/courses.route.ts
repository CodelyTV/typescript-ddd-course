import { Express } from 'express';
import container from '../dependency-injection';
import { CoursesPostController } from '../controllers/CoursesPostController';

export const register = (app: Express) => {
  const coursesPostController: CoursesPostController = container.get(
    'Apps.Backoffice.Backend.controllers.CoursesPostController'
  );

  app.post('/courses', coursesPostController.run.bind(coursesPostController));
};
