import { Database } from 'arangojs';

const db = new Database(process.env.ARANGO_URL);
db.useDatabase(process.env.DB_NAME);

export default db;
