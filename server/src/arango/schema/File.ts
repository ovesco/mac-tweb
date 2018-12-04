import * as Joi from 'joi';
import Base, { IBase } from './Base';
import Comment from './Comment';
import Tag from './Tag';

export interface IFile extends IBase {
    filename: string;
    mimeType: string;
    description: string;
    size: number;
    userKey: string;
    src?: string;
    comments?: Array<Comment>;
    tags?: Array<Tag>;
}

export default class File extends Base {
    filename: string;
    description: string;
    mimeType: string;
    size: number;
    userKey: string;
    src?: string;
    comments?: Array<Comment>;
    tags?: Array<Tag>;

    buildSchema() : object {
        return {
            filename: Joi.string().alphanum().min(4).required(),
            mimeType: Joi.string().min(3).alphanum().required(),
            size: Joi.number().min(10).integer().positive().required(),
            userKey: Joi.string().required(),
            src: Joi.string(),
            comments: Joi.array().items(Comment.schema()),
            tags: Joi.array().items(Tag.schema()),
        };
    }
}
