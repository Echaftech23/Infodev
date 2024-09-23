const Joi = require("joi");

class UserRequest {
  
  static validate(req) {
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().allow(null, ""), 
    }).options({ allowUnknown: true });

    const validationResult = schema.validate(req.body, { abortEarly: false });
    return validationResult;
  }
}

module.exports = UserRequest;