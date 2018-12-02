const FileSchema = require('./../schema/File');
const BaseManager = require('./BaseManager');
const db = require('./../index');

class FileManager extends BaseManager {
    constructor(collection) {
        super(collection, FileSchema);
        this.collection = collection;
    }
}

module.exports = new FileManager(db.collection('files'));
