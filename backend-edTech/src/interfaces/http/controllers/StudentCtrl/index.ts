import { Request, Response } from 'express';
import { CreateStudentUseCase } from '../../../../application/usecases/student/CreateStudentUseCase';
import { StudentValidator } from '../../validators/student';
import { CodeGeneratorService } from '../../../../utils/code';
import { PrismaErrorHandler } from '../../../../infra/errors/prismaErrorHandler';
import { db } from '../../../../config/database';

export class StudentController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = StudentValidator.validate(req.body);

      if (error) {
        res.status(400).json({
          success: false,
          message: 'failed',
          errors: error.details.map((e) => e.message),
        });
        return;
      }

      const useCase = new CreateStudentUseCase({
        generateCode: CodeGeneratorService.generate,
      });

      const result = await useCase.execute(value);

      await db.student.create({ data: result.student });

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
      const students = await db.student.findMany();

      res.status(200).json({
        success: true,
        message: !students.length ? 'No students found' : 'Success',
        students,
      });
    } catch (error) {
      const { statusCode, message } = PrismaErrorHandler.parse(error);
      res.status(statusCode).json({ success: false, message });
    }
  }

  public async getUnique(req: Request, res: Response): Promise<void> {
    try {
      const { key } = req.params;

      if (!key) {
        res
          .status(400)
          .json({ success: false, message: 'params must not be empty!' });
        return;
      }

      const student = await db.student.findFirst({
        where: {
          OR: [{ id: key }, { email: key }, { document: key }],
        },
      });

      if (!student) {
        res.status(404).json({
          success: false,
          message: 'Student not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'success',
        student,
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

      const { error, value } = StudentValidator.validateUpdate(req.body);

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

      await db.student.update({
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

      const student = await db.student.findUnique({ where: { id } });

      if (!student) {
        res.status(404).json({
          success: false,
          message: 'Student not found',
        });
        return;
      }

      await db.student.delete({ where: { id } });

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
