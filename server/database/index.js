const { Database } = require('arangojs');

const db = new Database();
db.createDatabase('colibri').then(() => {
    db.use('colibri');
});
