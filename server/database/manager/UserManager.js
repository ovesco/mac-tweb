const UserSchema = require('./../schema/User');
const BaseManager = require('./BaseManager');
const db = require('./../index');

class UserManager extends BaseManager {
    constructor(collection) {
        super(collection, UserSchema);
        this.collection = collection;
    }
}

module.exports = new UserManager(db.collection('users'));
