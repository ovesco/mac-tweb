import * as Joi from 'joi';
import Edge, { IEdge } from './Edge';

export interface INotification extends IEdge {
    type: string;
    read: boolean;
    performerKey: string;
}

export default class Notification extends Edge implements INotification {
    read: boolean;

    constructor(_from: string, _to: string, public performerKey: string, public type: string) {
        super(_from, _to);
        this.read = false;
    }

    _edgeSchema() : object {
        return {
            type: Joi.string().required(),
            performerKey: Joi.string().required(),
            read: Joi.boolean(),
        };
    }
}
