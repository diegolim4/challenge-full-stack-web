import { Request, Response, NextFunction } from 'express';
import { PrismaErrorHandler } from '../../infra/errors/prismaErrorHandler';
import { db } from '../../config/database';

export async function adminAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const accessKey = req.headers['authorization'];

    if (!accessKey) {
      res.status(401).json({ success: false, message: 'Access key missing' });
      return;
    }
    const admin = await db.admin.findUnique({ where: { accessKey } });

    if (!admin) {
      res.status(401).json({ success: false, message: 'Invalid access key' });
      return;
    }
    
    next();
  } catch (error) {
    const { statusCode, message } = PrismaErrorHandler.parse(error);
    res.status(statusCode).json({ success: false, message });
    return;
  }
}
