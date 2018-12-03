import * as Joi from 'joi';
import db from '../Database';
import Base from '../schema/Base';
import {BaseCollection} from 'arangojs/lib/cjs/collection';
import {DocumentCollection} from 'arangojs';

export default abstract class AbstractManager {
    protected collection : BaseCollection;

    constructor(collectionName: string) {
        this.collection = db.collection(collectionName);
    }

    find<T extends Base>(key: string) : Promise<T> {
        return this.collection.document(key);
    }

    update<T extends Base>(key: string, item: T): Promise<T> {
        const schema = (<typeof Base> Base.constructor).getSchema();
        Joi.assert(item, schema);
        return this.collection.update(key, item);
    }

    save<T extends Base>(item: T): Promise<T> {
        if (this.collection instanceof DocumentCollection) {
            return this.collection.save(item);
        }
        throw new Error('TODO mamene');
    }

    async remove<T extends Base>(item: T) {
        await this.collection.remove(item);
    }
}
