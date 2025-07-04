import Joi from 'joi';

export class AuthValidator {
  public static validate(input: any) {
    const schema = Joi.object({
      email: Joi.string().email().required().trim().lowercase(),
      password: Joi.string().required().trim(),
    });

    return schema.validate(input, { abortEarly: false, stripUnknown: true });
  }
}
