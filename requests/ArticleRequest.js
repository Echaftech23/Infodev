const Joi = require("joi");

class ArticleRequest {
  static validate(req) {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      image: Joi.any().required(),
    }).options({ allowUnknown: true });

    // Combine body and file data for validation
    const dataToValidate = {
      ...req.body,
      image: req.file, // Assuming you're using middleware like multer
    };

    const validationResult = schema.validate(dataToValidate, { abortEarly: false });
    return validationResult;
  }
}

module.exports = ArticleRequest;