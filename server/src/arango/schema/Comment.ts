import * as Joi from 'joi';
import Base, { IBase } from './Base';
import Tag from './Tag';

export interface IComment extends IBase {
    userKey: string;
    content: string;
    tags?: Array<Tag>;
}

export default class Comment extends Base implements IComment {
    userKey: string;
    content: string;
    tags?: Array<Tag>;

    getSchema(): object {
        return Joi.object().keys({
            userKey: Joi.string().required(),
            content: Joi.string().required(),
            tags: Joi.array().items(Tag.getSchema()),
        });
    }
}
