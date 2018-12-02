const Joi = require('joi');

module.exports = class {
    constructor(collection, schema) {
        this.schema = schema;
        this.collection = collection;
    }

    async find(key) {
        const result = await this.collection.document(key);
        return result;
    }

    async save(doc) {
        this.validate(doc);
        await this.collection.save(doc);
    }

    async update(key, doc) {
        this.validate(doc);
        await this.collection.update(key, doc);
    }

    async delete(key) {
        await this.collection.remove(key);
    }

    validate(object) {
        const { error } = Joi.validate(object, this.schema);
        if (error !== null) throw new Error(error);
    }
};
