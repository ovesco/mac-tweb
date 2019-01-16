import AbstractManager from './AbstractManager';
import * as Joi from 'joi';
import { aql, EdgeCollection } from 'arangojs';
import { IEdge } from '../schema/Edge';
import { IBase } from '../schema/Base';

export const EDGES_COLLECTION = 'edges';
export const EDGES_GRAPH = `${process.env.DB_NAME}_graph`;

export default abstract class extends AbstractManager {
    constructor(protected edgeQualifier: string) {
        super(EDGES_COLLECTION);
        this.collection = this.db.edgeCollection(EDGES_COLLECTION);
    }

    removeEdge(_from: string, _to: string): Promise<null> {
        return this.query(aql`
        FOR x IN ${this.collection}
            REMOVE { _from == ${_from} && _to == ${_to} && _qualifier == ${this.edgeQualifier} }
                IN ${this.collection}`).then(() => null);
    }

    // @ts-ignore
    saveIfNoExist(item: IEdge): Promise<IEdge> {
        return <Promise<IEdge>>this.findOneBy({ _from: item._from, _to: item._to }, true)
            .then((existing: IEdge) => {
                if (existing) {
                    return new Promise((resolve) => {
                        resolve(existing);
                    });
                }
                return this.save(item);
            });
    }

    findBy<T extends IBase>(data: object) : Promise<Array<T>> {
        (data as any)._qualifier = this.edgeQualifier;
        return super.findBy(data);
    }

    save<T extends IBase>(item: T): Promise<T> {
        (item as any)._qualifier = this.edgeQualifier;
        Joi.assert(item, item._getSchema());
        return (this.collection as EdgeCollection).save(item).then((response : IEdge) => {
            item._key = response._key;
            item._id = response._id;
            if (item.date instanceof Date) item.date = item.date.toISOString();
            return item;
        });
    }
}
