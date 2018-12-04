import * as Joi from 'joi';
import Base, { IBase } from './Base';

export interface ITag extends IBase {
    tag: String;
}

export default class Tag extends Base implements ITag {
    tag: String;

    getSchema() : object {
        return Joi.object().keys({
            tag: Joi.string().min(2).alphanum().required(),
        });
    }
}
