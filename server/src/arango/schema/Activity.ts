import * as Joi from 'joi';

import Base, { IBase } from './Base';
import Tag from './Tag';
import Comment from './Comment';

export interface IActivity extends IBase {
    content?: string;
    userKey: string;
    tags?: Array<Tag>;
    comments?: Array<Comment>;
}

export default class Activity extends Base implements IActivity {
    content?: string;
    userKey: string;
    tags?: Array<Tag>;
    comments?: Array<Comment>;

    constructor() {
        super();
        this.tags = [];
    }

    getSchema() : object {
        return Joi.object().keys({
            content: Joi.string().alphanum(),
            userKey: Joi.string().required(),
            tags: Joi.array().items(Tag.getSchema()),
            comments: Joi.array().items(Comment.getSchema()),
        });
    }
}
