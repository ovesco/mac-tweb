import * as Joi from 'joi';
import Edge from './Edge';

export enum LikeType {
    LIKE = 'like',
    STAR = 'star',
    SAVE = 'save',
}

export class Like extends Edge {
    date: Date;
    type: LikeType;

    constructor() {
        super();
        this.date = new Date();
    }

    static getSchema() : object {
        return Joi.object().keys({
            date: Joi.date().required(),
            type: Joi.string().required(),
        });
    }
}
