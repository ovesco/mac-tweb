import Joi from 'joi';
import Base from './Base';

export default class User extends Base {
    username: String;
    password?: String;
    name: String;
    email: String;

    static getSchema() : object {
        return Joi.object().keys({
            username: Joi.string().alphanum().min(3).max(20).required(),
            password: Joi.string().alphanum().min(7).max(30),
            name: Joi.string().alphanum().min(3).required(),
            email: Joi.string().email().required(),
        });
    }
}
