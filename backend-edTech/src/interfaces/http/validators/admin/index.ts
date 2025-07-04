import Joi from 'joi';

export class AdminValidator {
  public static validate(input: any) {
    const schema = Joi.object({
      fullName: Joi.string().trim().lowercase(),
      email: Joi.string().email().required().trim().lowercase(),
      password: Joi.string().required().trim(),
    });

    return schema.validate(input, { abortEarly: false, stripUnknown: true });
  }

  public static validateUpdate(input: any) {
    const schema = Joi.object({
      fullName: Joi.string().trim().lowercase(),
      email: Joi.string().email().trim().lowercase(),
      status: Joi.boolean(),
      accessKey: Joi.forbidden(),
    });

    return schema.validate(input, { abortEarly: false, stripUnknown: true });
  }
}
