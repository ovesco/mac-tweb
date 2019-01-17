import * as Joi from 'joi';
import database from '../Database';
import { IBase } from '../schema/Base';
import { BaseCollection } from 'arangojs/lib/cjs/collection';
import { aql, Database, DocumentCollection } from 'arangojs';
import { ArrayCursor } from 'arangojs/lib/cjs/cursor';

export default abstract class AbstractManager {
    protected db : Database;
    protected collection : BaseCollection;

    constructor(protected collectionName: string) {
        this.db = database;
        this.collection = this.db.collection(collectionName);
    }

    query(query: any): Promise<ArrayCursor> {
        return this.db.query(query);
    }

    find<T extends IBase>(key: string) : Promise<T> {
        return this.collection.document(key);
    }

    findById<T extends IBase>(_id: string) : Promise<T> {
        return this.findOneBy({ _id }, true);
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
        return this.query({
            query,
            bindVars: {
                '@value0': this.collection.name,
                ...vars,
            },
        }).then(cursor => cursor.all()).catch(() => {
            console.log('Error in findBy');
        });
    }

    findOneBy<T extends IBase>(data: object, strict: boolean) : Promise<T> {
        return this.findBy(data).then(
            result => result.length === 0
                ? null
                : (strict && result.length !== 1 ? null : result[0] as T),
        );
    }

    findByMultipleKeys<T extends IBase>(keys: Array<String>) : Promise<Array<T>> {
        return this.query(aql`FOR x IN ${this.collection} FILTER x._key IN ${keys} RETURN x`)
            .then(cursor => cursor.all()).catch(() => {
                console.log('BAIL multiplekeys');
            });
    }

    findAll<T extends IBase>() : Promise<Array<T>> {
        return this.collection.all().then(cursor => cursor.all());
    }

    update<T extends IBase>(key: string, item: T): Promise<T> {
        Joi.assert(item, item._getSchema());
        return this.collection.update(key, item).then(() => item);
    }

    save<T extends IBase>(item: T): Promise<T> {
        Joi.assert(item, item._getSchema());
        return (this.collection as DocumentCollection).save(item).then((response : IBase) => {
            item._key = response._key;
            item._id = response._id;
            if (item.date instanceof Date) item.date = item.date.toISOString();
            return item;
        });
    }

    remove<T extends IBase>(item: T): Promise<any> {
        // browse edges to remove all liked to this element
        const edges = this.db.collection('edges');
        return this.query(aql`
            FOR item IN ${edges}
                FILTER item._from == ${item._id} || item._to == ${item._id}
                    REMOVE {_key: item._key} IN edges
        `).then(() => this.collection.remove(item)).catch((e) => {
            console.log(e);
        });
    }

    getCollection(): BaseCollection {
        return this.collection;
    }
}
