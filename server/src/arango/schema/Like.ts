import * as Joi from 'joi';
import Edge from './Edge';

export enum LikeType {
    LIKE = 'like',
    STAR = 'star',
    SAVE = 'save',
}

export interface ILike{
    type: LikeType;
}

export default class Like extends Edge implements ILike {
    type: LikeType;

    buildSchema() : object {
        return {
            type: Joi.string().required(),
        };
    }
}
