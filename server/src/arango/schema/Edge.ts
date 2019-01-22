import Base, { IBase } from './Base';
import * as Joi from 'joi';

/**
 * All edges of the app are contained in a single collection on which
 * we build an arango graph
 */

export interface IEdge extends IBase {
    _qualifier: string;
    _from: string;
    _to: string;
}

export default abstract class Edge extends Base implements IEdge {
    _qualifier: string;

    constructor(public _from: string, public _to: string) {
        super();
    }

    buildSchema(): object {
        return {
            _from: Joi.string().required(),
            _to: Joi.string().required(),
            _qualifier: Joi.string().required(),
            ...this._edgeSchema(),
        };
    }

    _edgeSchema(): object {
        return {};
    }
}
