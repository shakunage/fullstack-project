import { Request, Response } from 'express';

export const healthcheck = (_req: Request, res: Response) => {
  res.status(200).send('OK');
};
