import { Router } from 'express';
import { healthcheck } from './healthcheckController.ts';

const HealthcheckRouter = Router();

HealthcheckRouter.get('/', healthcheck);

export default HealthcheckRouter;
