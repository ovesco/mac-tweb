import * as Joi from 'joi';
import database from '../Database';
import Base, { IBase } from '../schema/Base';
import { BaseCollection } from 'arangojs/lib/cjs/collection';
import { aql, Database, DocumentCollection } from 'arangojs';
import {object, string} from "joi";

export default abstract class AbstractManager {

    protected db : Database;
    protected collection : BaseCollection;

    constructor(collectionName: string, protected schema: object) {
        this.db = database;
        this.collection = this.db.collection(collectionName);
    }

    find<T extends IBase>(key: string) : Promise<T> {
        console.log('YAMAN');
        return this.collection.document(key);
    }

    findBy<T extends IBase>(data: object) : Promise<Array<T>> {
        let index = 1;
        const vars:any = {};
        const terms = Array<string>();
        for(const property in data) {
            if(data.hasOwnProperty(property)) {
                terms.push(`x.${property} == @value${index}`);
                // @ts-ignore
                vars[`value${index++}`] = data[property];
            }
        }
        const query = 'FOR x IN @@value0 FILTER ' + terms.join(' && ') + ' RETURN x';
        return this.db.query({
            query,
            bindVars: {
                '@value0': this.collection.name,
                ...vars,
            },
        }).then(cursor => cursor.all());
    }

    findOneBy<T extends IBase>(data: object, strict: boolean) : Promise<T> {
        return this.findBy(data).then(
            result => result.length === 0
                ? null
                : (strict && result.length !== 1 ? null : result[0] as T),
        );
    }

    findAll() : Promise<Array<IBase>> {
        return this.collection.all().then(cursor => cursor.map(doc => doc));
    }

    update(key: string, item: IBase): Promise<IBase> {
        Joi.assert(item, this.schema);
        return this.collection.update(key, item);
    }

    save<T extends IBase>(item: T): Promise<T> {
        Joi.assert(item, this.schema);
        return (this.collection as DocumentCollection).save(item).then((response : IBase) => {
            item._key = response._key;
            item._id = response._id;
            return item;
        });
    }

    remove<T extends IBase>(item: T): Promise<any> {
        return this.collection.remove(item);
    }

    getCollection(): BaseCollection {
        return this.collection;
    }
}
