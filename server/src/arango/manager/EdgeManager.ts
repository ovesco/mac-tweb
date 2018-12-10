import AbstractManager from './AbstractManager';
import * as Joi from 'joi';
import { aql, EdgeCollection } from 'arangojs';
import { IEdge } from '../schema/Edge';
import { IBase } from '../schema/Base';

export default class extends AbstractManager {
    constructor(collectionName: string) {
        super(collectionName);
        this.collection = this.db.edgeCollection(collectionName);
    }

    removeEdge(_from: string, _to: string): Promise<null> {
        return this.db.query(aql`
        FOR x IN ${this.collection}
            REMOVE { _from == ${_from} && _to == ${_to} } IN ${this.collection}`).then(() => null);
    }

    // @ts-ignore
    saveIfNoExist<T extends IEdge>(item: T): Promise<T> {
        return <Promise<T>>this.findOneBy({ _from: item._from, _to: item._to }, true)
            .then((existing: T) => {
                if (existing) {
                    return new Promise((resolve) => {
                        resolve(existing);
                    });
                }
                return this.save(item);
            });
    }

    save<T extends IBase>(item: T): Promise<T> {
        Joi.assert(item, item._getSchema());
        return (this.collection as EdgeCollection).save(item).then((response : IEdge) => {
            item._key = response._key;
            item._id = response._id;
            return item;
        });
    }
}
