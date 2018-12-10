import * as Joi from 'joi';
import Base, { IBase } from './Base';
import Tag from './Tag';

export interface IComment extends IBase {
    userKey: string;
    content: string;
}

export default class Comment extends Base implements IComment {
    userKey: string;
    content: string;

    buildSchema(): object {
        return {
            userKey: Joi.string().required(),
            content: Joi.string().required(),
        };
    }
}
