import * as Joi from 'joi';

import Base, { IBase } from './Base';
import Comment from './Comment';

export interface IActivity extends IBase {
    content?: string;
    userKey: string;
    tags?: Array<string>;
    files: Array<any>;
    comments?: Array<Comment>;
}

export default class Activity extends Base implements IActivity {
    content?: string;
    userKey: string;
    tags: Array<string>;
    files: Array<any>;
    comments: Array<Comment>;

    constructor() {
        super();
        this.files = [];
        this.tags = [];
        this.comments = [];
    }

    buildSchema() : object {
        return {
            content: Joi.string(),
            userKey: Joi.string().required(),
            tags: Joi.array(),
            files: Joi.array(),
            comments: Joi.array().items(Comment.schema()),
        };
    }
}
