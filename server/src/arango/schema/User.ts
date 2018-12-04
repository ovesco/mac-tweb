import * as Joi from 'joi';
import Base, { IBase } from './Base';

export enum ROLE {
    ADMIN = 'admin',
}

export interface IUser extends IBase {
    username: String;
    password?: String;
    name: String;
    email: String;
    roles: Array<ROLE>;
}

export default class User extends Base implements IUser {
    username: String;
    password?: String;
    name: String;
    email: String;
    roles: Array<ROLE>;

    getSchema() : object {
        return Joi.object().keys({
            username: Joi.string().alphanum().min(3).max(20).required(),
            password: Joi.string().alphanum().min(7).max(30),
            name: Joi.string().alphanum().min(3).required(),
            email: Joi.string().email().required(),
            roles: Joi.array(),
        });
    }
}
