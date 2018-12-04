import * as Joi from 'joi';

export interface IBase {
    _key?: string;
    _id?: string;
    date?: Date;
}

export default abstract class Base implements IBase {
    _key?: string;
    _id?: string;
    date?: Date;

    constructor() {
        this.date = new Date();
    }

    getSchema() : object {
        return Joi.object().keys({});
    }

    static getSchema() : object {
        return this.prototype.constructor().getSchema();
    }
}
