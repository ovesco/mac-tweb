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

    getSchema() : object {
        return Joi.object().keys({
            type: Joi.string().required(),
        });
    }
}
