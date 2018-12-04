import Base, { IBase } from './Base';
import * as Joi from "joi";
import Tag from "./Tag";

interface IEdge extends IBase {
    _from: string;
    _to: string;
}

export default abstract class Edge extends Base implements IEdge {
    _from: string;
    _to: string;

    buildSchema(): object {
        return {
            _from: Joi.string().required(),
            _to: Joi.string().required(),
        };
    }
}
