/* eslint-disable newline-per-chained-call */
const Joi = require('joi');

module.exports = Joi.object().keys({
    filename: Joi.string().alphanum().required(),
    mimeType: Joi.string().required(),
    size: Joi.number().integer().required(),
    src: Joi.string().trim().required(),
    ownerId: Joi.any().required(),
});
