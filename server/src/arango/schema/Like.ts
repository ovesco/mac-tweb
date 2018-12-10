import * as Joi from 'joi';
import Edge, { IEdge } from './Edge';

export enum LikeType {
    LIKE = 'LIKE',
    STAR = 'STAR',
    SAVE = 'SAVE',
}

export interface ILike extends IEdge {
    type: LikeType;
    userKey: string;
}

export default class Like extends Edge implements ILike {
    type: LikeType;
    userKey: string;

    _edgeSchema() : object {
        return {
            type: Joi.string().required(),
            userKey: Joi.string().required(),
        };
    }
}
