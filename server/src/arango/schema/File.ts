import Joi from 'joi';
import Base from './Base';
import Comment from './Comment';
import Tag from './Tag';

export default class File extends Base {
    filename: string;
    mimeType: string;
    size: number;
    userKey: string;
    date: Date;
    src?: string;
    comments: Array<Comment>;
    tags: Array<Tag>;

    constructor() {
        super();
        this.date = new Date();
    }


    static getSchema() : object {
        return Joi.object().keys({
            filename: Joi.string().alphanum().min(4).required(),
            mimeType: Joi.string().min(3).alphanum().required(),
            size: Joi.number().min(10).integer().positive().required(),
            userKey: Joi.string().required(),
            src: Joi.string(),
            date: Joi.date().required(),
            comments: Joi.array().items(Comment.getSchema()),
            tags: Joi.array().items(Tag.getSchema()),
        });
    }
}
