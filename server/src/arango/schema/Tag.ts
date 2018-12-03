import Joi from 'joi';
import Base from './Base';

export default class Tag extends Base {
    tag: String;

    static getSchema() : object {
        return Joi.object().keys({
            tag: Joi.string().min(2).alphanum().required(),
        });
    }
}
