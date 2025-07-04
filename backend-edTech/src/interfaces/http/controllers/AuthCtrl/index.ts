import { Request, Response } from 'express';
import { AuthValidator } from '../../validators/auth';
import { PrismaErrorHandler } from '../../../../infra/errors/prismaErrorHandler';
import { db } from '../../../../config/database';
import { IAdmin } from '../../../../domain/interfaces/admin';
import { compare } from 'bcrypt';

export class AuthController {
  public async create(req: Request, res: Response): Promise<void> {
    const { error, value } = AuthValidator.validate(req.body);

    if (error) {
      res.status(400).json({
        success: false,
        message: 'failed',
        errors: error.details.map((e) => e.message),
      });
      return;
    }

    const { email, password }: IAdmin = value;

    const admin = await db.admin.findUnique({ where: { email } });

    if (!admin) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const validPassword = await compare(password, admin.password);

    if (!validPassword) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'success',
      data: { id: admin.id, accessKey: admin.accessKey },
    });
    try {
    } catch (error) {
      const { statusCode, message } = PrismaErrorHandler.parse(error);
      console.error(message);
      res.status(statusCode).json({ success: false, message });
    }
  }
}
