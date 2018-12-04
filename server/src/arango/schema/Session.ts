import * as Joi from 'joi';
import Base, { IBase } from './Base';

export interface ISession extends IBase {
    userKey: string;
    localKey: string;
}

export default class Session extends Base implements ISession {
    userKey: string;
    localKey: string;

    buildSchema() : object {
        return {
            userKey: Joi.string().alphanum().required(),
            localKey: Joi.string().alphanum().required(),
        };
    }
}
