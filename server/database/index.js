const { Database } = require('arangojs');

const database = new Database(process.env.ARANGO_URL);
database.useDatabase(process.env.DB_NAME);
module.exports = database;
