const Joi = require('joi');

module.exports = class {
    constructor(schema) {
        this.schema = schema;
    }

    static async initCollection(db, name) {
        const collection = db.collection(name);
        await collection.create();
        this.collection = collection;
    }

    async find(key) {
        return this.collection.document(key);
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
