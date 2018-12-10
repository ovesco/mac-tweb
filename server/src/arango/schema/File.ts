import * as Joi from 'joi';
import Base, { IBase } from './Base';
import Comment from './Comment';
import Tag from './Tag';

export interface IFile extends IBase {
    filename: string;
    mimeType: string;
    description?: string;
    size: number;
    userKey: string;
    src?: string;
    comments?: Array<Comment>;
    tags?: Array<string>;
}

export interface IActivityFileInput {
    upload: any;
    activityKey: string;
}

export default class File extends Base {
    filename: string;
    description?: string;
    mimeType: string;
    size: number;
    userKey: string;
    src?: string;
    comments?: Array<Comment>;
    tags?: Array<string>;

    buildSchema() : object {
        return {
            filename: Joi.string().min(4).required(),
            mimeType: Joi.string().min(3).required(),
            size: Joi.number().min(10).integer().positive().required(),
            description: Joi.string(),
            userKey: Joi.string().required(),
            src: Joi.string(),
            comments: Joi.array().items(Comment.schema()),
            tags: Joi.array(),
        };
    }
}
