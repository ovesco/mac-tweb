import Base, { IBase } from './Base';

interface IEdge extends IBase {
    _from: string;
    _to: string;
}

export default abstract class Edge extends Base implements IEdge {
    _from: string;
    _to: string;
}
