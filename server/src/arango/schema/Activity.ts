import Joi from 'joi';

import Base from './Base';
import Tag from './Tag';
import Comment from './Comment';

export default class Activity extends Base {
    content?: string;
    userKey: string;
    date: Date;
    tags: Array<Tag>;
    comments: Array<Comment>;

    constructor() {
        super();
        this.date = new Date();
        this.tags = [];
    }

    static getSchema() : object {
        return Joi.object().keys({
            content: Joi.string().alphanum(),
            userKey: Joi.string().required(),
            date: Joi.date().required(),
            tags: Joi.array().items(Tag.getSchema()),
            comments: Joi.array().items(Comment.getSchema()),
        });
    }
}
