require('dotenv').config();
import AbstractManager from './manager/AbstractManager';
import ActivityManager from './manager/ActivityManager';
import CommentManager from './manager/CommentManager';
import FileManager from './manager/FileManager';
import SessionManager from './manager/SessionManager';
import TagManager from './manager/TagManager';
import UserManager from './manager/UserManager';
import DirectoryManager from './manager/DirectoryManager';
import ActivityFileEdgeManager from './manager/ActivityFileEdgeManager';
import LikeManager from './manager/LikeManager';
import db from './Database';

function initCollections() {
    const managers = [
        ActivityManager,
        CommentManager,
        FileManager,
        SessionManager,
        TagManager,
        UserManager,
        DirectoryManager,
        ActivityFileEdgeManager,
        LikeManager,
    ];

    managers.forEach((manager: AbstractManager) => {
        manager.getCollection().create().then(
            () => null,
            err => console.log('Collection already exist'),
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
