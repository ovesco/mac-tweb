import { Database } from 'arangojs';

/**
 * Allows us to configure the correct DB to use
 */
const db = new Database(process.env.ARANGO_URL);
db.useDatabase(process.env.DB_NAME);

export default db;
