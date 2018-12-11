import * as Joi from 'joi';
import Edge, { IEdge } from './Edge';

export interface IComment extends IEdge {
    content: string;
}

export default class Comment extends Edge implements IComment {
    content: string;

    _edgeSchema(): object {
        return {
            userKey: Joi.string().required(),
            content: Joi.string().required(),
        };
    }
}
