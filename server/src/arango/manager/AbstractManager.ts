import Joi from 'joi';
import { BaseCollection, DocumentCollection } from 'arangojs/lib/cjs/collection';
import db from '../Database';
import Base from '../schema/Base';

export default abstract class AbstractManager {
    protected collection : BaseCollection;

    constructor(collectionName: string) {
        this.collection = db.collection(collectionName);
    }

    async find<T extends Base>(key: string) : T {
        return await this.collection.document(key);
    }

    async update<T extends Base>(key: string, item: T): T {
        const schema = (<typeof Base> Base.constructor).getSchema();
        Joi.assert(item, schema);
        return await this.collection.update(key, item);
    }

    async save<T extends Base>(item: T): T {
        if (this.collection instanceof DocumentCollection) {
            return await this.collection.save(item);
        }
        throw new Error('TODO mamene');
    }

    async delete<T extends Base>(item: T): void {
        await this.collection.remove(item);
    }
}
