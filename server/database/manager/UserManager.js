const UserSchema = require('./../schema/User');
const BaseManager = require('./BaseManager');

class UserManager extends BaseManager {
    constructor() {
        super();
        this.collection = null;
    }

    async build(db) {
        this.collection = await exports.initCollection(db, 'users');
    }
}

module.exports = UserManager;
