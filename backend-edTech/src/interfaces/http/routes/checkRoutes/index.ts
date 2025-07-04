import { Router, Response } from 'express';

const checkRouter = Router();

checkRouter.get('/check', (_, res: Response) => {
  res.status(200).json({
    message: 'Ok!',
    success: true,
    timestamp: new Date(),
  });
});

export default checkRouter;
