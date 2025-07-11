import { Response, Request, Router } from 'express';

const router = Router();

const healthcheck = (_req: Request, res: Response) => {
  res.status(200).send('OK');
};

router.get('/', healthcheck);

export default router;
