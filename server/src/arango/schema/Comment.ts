import Joi from 'joi';
import Base from './Base';
import Tag from './Tag';

export default class Comment extends Base {
    userKey: string;
    content: string;
    date: Date;
    tags: Array<Tag>;

    constructor() {
        super();
        this.date = new Date();
    }

    static getSchema(): object {
        return Joi.object().keys({
            userKey: Joi.string().required(),
            content: Joi.string().required(),
            date: Joi.date().required(),
            tags: Joi.array().items(Tag.getSchema()),
        });
    }
}
