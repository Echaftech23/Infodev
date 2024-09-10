const Joi = require("joi");

class ArticleRequest {
  
  static validate(req) {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      image: Joi.string().allow(null, ""), 
    }).options({ allowUnknown: true });

    const validationResult = schema.validate(req.body, { abortEarly: false });
    return validationResult;
  }
}

module.exports = ArticleRequest;