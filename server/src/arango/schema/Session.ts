import * as Joi from 'joi';
import Base, { IBase } from './Base';

export interface ISession extends IBase {
    userKey: string;
    localKey: string;
}

export default class Session extends Base implements ISession {
    userKey: string;
    localKey: string;

    getSchema() : object {
        return Joi.object().keys({
            userKey: Joi.string().alphanum().required(),
            localKey: Joi.string().alphanum().required(),
        });
    }
}
