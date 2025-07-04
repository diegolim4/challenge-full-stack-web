import Joi from 'joi';

export class StudentValidator {
  public static validate(input: any) {
    const schema = Joi.object({
      fullName: Joi.string().trim().lowercase(),
      email: Joi.string().email().required().trim().lowercase(),
      document: Joi.string().required().trim(),
      createdBy: Joi.string().required().trim().lowercase()
    });

    return schema.validate(input, { abortEarly: false, stripUnknown: true });
  }

  public static validateUpdate(input: any) {
    const schema = Joi.object({
      fullName: Joi.string().trim().lowercase(),
      email: Joi.string().email().trim().lowercase(),
      status: Joi.boolean(),
      document: Joi.forbidden(),
      studentRecord: Joi.forbidden(),
      createdBy: Joi.forbidden()
    });

    return schema.validate(input, { abortEarly: false, stripUnknown: true });
  }
}
