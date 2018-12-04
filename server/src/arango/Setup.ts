import {func} from "joi";

require('dotenv').config();
import AbstractManager from './manager/AbstractManager';
import manager1 from './manager/ActivityManager';
import manager2 from './manager/CommentManager';
import manager3 from './manager/FileManager';
import manager4 from './manager/SessionManager';
import manager5 from './manager/TagManager';
import manager6 from './manager/UserManager';
import db from './Database';

function initCollections() {
    const managers = [
        manager1,
        manager2,
        manager3,
        manager4,
        manager5,
        manager6,
    ];

    managers.forEach((manager: AbstractManager) => {
        manager.getCollection().create().then(
            () => null,
            err => console.log(err),
        );
    });
}

db.listDatabases().then((res) => {
    if(!res.includes(process.env.DB_NAME)) {
        db.createDatabase(process.env.DB_NAME).then(() => {
            initCollections();
        });
    } else {
        initCollections();
    }
});
