import * as Joi from 'joi';

export interface IBase {
    _key?: string;
    _id?: string;
    _rev?: string;
    date?: string | Date;

    _getSchema(): object;
    buildSchema(): object;
}

export default abstract class Base implements IBase {
    _key?: string;
    _id?: string;
    _rev?: string;
    date?: string | Date;

    constructor() {
        this.date = new Date();
    }

    _getSchema() : object {

        return Joi.object().keys({
            _key: Joi.string().alphanum(),
            _id: Joi.string(),
            _rev: Joi.string(),
            date: Joi.date(),
            ...this.buildSchema(),
        });
    }

    abstract buildSchema(): object;

    static schema() : object {
        return Object.create(this.prototype)._getSchema();
    }
}
