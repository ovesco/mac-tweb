import * as Joi from 'joi';

export default abstract class Base {
    _key?: string;

    static getSchema() : object {
        return Joi.object().keys({});
    }
}
