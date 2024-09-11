const Joi = require('joi');

const createCommentSchema = Joi.object({
    content: Joi.string().trim().min(1).required(),
    articleId: Joi.number().integer().required(),
});

const updateCommentSchema = Joi.object({
    content: Joi.string().trim().min(1).required(),
});

module.exports = {
    createCommentSchema,
    updateCommentSchema
};
