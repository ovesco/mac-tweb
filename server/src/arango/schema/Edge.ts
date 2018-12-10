import Base, { IBase } from './Base';
import * as Joi from "joi";
import Tag from "./Tag";

export interface IEdge extends IBase {
    _from: string;
    _to: string;
}

export default abstract class Edge extends Base implements IEdge {
    constructor(public _from: string, public _to: string) {
        super();
    }

    buildSchema(): object {
        return {
            _from: Joi.string().required(),
            _to: Joi.string().required(),
            ...this._edgeSchema(),
        };
    }

    _edgeSchema(): object {
        return {};
    }
}
