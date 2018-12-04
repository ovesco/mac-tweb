import * as Joi from 'joi';

import Base, { IBase } from './Base';
import Tag from './Tag';
import Comment from './Comment';

export interface IActivity extends IBase {
    content?: string;
    userKey: string;
    tags?: Array<string>;
    comments?: Array<Comment>;
    filesKey?: Array<string>;
}

export default class Activity extends Base implements IActivity {
    content?: string;
    userKey: string;
    tags?: Array<string>;
    comments?: Array<Comment>;
    filesKey?: Array<string>;

    buildSchema() : object {
        return {
            content: Joi.string(),
            userKey: Joi.string().required(),
            tags: Joi.array(),
            comments: Joi.array().items(Comment.schema()),
            filesKey: Joi.array(),
        };
    }
}
