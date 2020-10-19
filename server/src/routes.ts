import { Router } from 'express';
import connectionController from './controllers/ConnectionController';
import classController from './controllers/ClassController';

const routes = Router();

routes.get('/classes', classController.findAll);
routes.post('/classes', classController.create);

routes.get('/connections', connectionController.findAll);
routes.post('/connections', connectionController.create);

export default routes;
