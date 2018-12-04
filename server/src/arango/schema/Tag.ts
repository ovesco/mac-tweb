import * as Joi from 'joi';
import Base, { IBase } from './Base';

export interface ITag extends IBase {
    tag: string;
}

export default class Tag extends Base implements ITag {
    constructor(public tag: string) {
        super();
    }

    buildSchema() : object {
        return {
            tag: Joi.string().min(1).alphanum().required(),
        };
    }
}
