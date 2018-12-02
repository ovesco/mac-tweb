/* eslint-disable newline-per-chained-call */
const Joi = require('joi');

module.exports = Joi.object().keys({
    user: Joi.string().required(),
    comment: Joi.string().min(1).trim().required(),
});
