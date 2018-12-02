/* eslint-disable newline-per-chained-call */
const Joi = require('joi');

module.exports = Joi.object().keys({
    username: Joi.string().alphanum().min(4).max(25).required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(4).trim().required(),
    email: Joi.string().email().required(),
});
