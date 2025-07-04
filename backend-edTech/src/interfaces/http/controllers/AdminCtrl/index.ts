import { Request, Response } from 'express';
import { AdminValidator } from '../../validators/admin';
import { PrismaErrorHandler } from '../../../../infra/errors/prismaErrorHandler';
import { db } from '../../../../config/database';
import { hash } from 'bcrypt';
export class AdminController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = AdminValidator.validate(req.body);

      const body = {
        fullName: value.fullName,
        email: value.email,
        password: await hash(value.password, 15),
        status: value.status,
      };

      if (error) {
        res.status(400).json({
          success: false,
          message: 'failed',
          errors: error.details.map((e) => e.message),
        });
        return;
      }

      await db.admin.create({ data: body });

      res.status(201).json({
        success: true,
        message: 'success',
      });
    } catch (error) {
      const { statusCode, message } = PrismaErrorHandler.parse(error);
      res.status(statusCode).json({ success: false, message });
    }
  }

  public async get(__: Request, res: Response): Promise<void> {
    try {
      const admins = await db.admin.findMany();

      res.status(200).json({
        success: true,
        message: !admins.length ? 'No admin found' : 'success',
        admins,
      });
    } catch (error) {
      const { statusCode, message } = PrismaErrorHandler.parse(error);
      res.status(statusCode).json({ success: false, message });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res
          .status(400)
          .json({ success: false, message: 'Parameter "id" is required' });
        return;
      }

      const { error, value } = AdminValidator.validateUpdate(req.body);

      if (error) {
        res.status(400).json({
          success: false,
          message: 'failed',
          errors: error.details.map((e) => e.message),
        });
        return;
      }

      if (!Object.keys(value).length) {
        res
          .status(400)
          .json({ success: false, message: 'Request body cannot be empty' });
        return;
      }

      await db.admin.update({
        where: { id },
        data: value,
      });

      res.status(200).json({
        success: true,
        message: 'success',
      });
    } catch (error) {
      const { statusCode, message } = PrismaErrorHandler.parse(error);
      res.status(statusCode).json({ success: false, message });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res
          .status(400)
          .json({ success: false, message: 'Parameter "id" is required' });
        return;
      }

      const admin = await db.admin.findUnique({ where: { id } });

      if (!admin) {
        res.status(404).json({
          success: false,
          message: 'Admin not found',
        });
        return;
      }

      await db.admin.delete({ where: { id } });

      res.status(200).json({
        success: true,
        message: 'success',
      });
    } catch (error) {
      const { statusCode, message } = PrismaErrorHandler.parse(error);
      res.status(statusCode).json({ success: false, message });
    }
  }
}
