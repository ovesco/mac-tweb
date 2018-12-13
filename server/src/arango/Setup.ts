require('dotenv').config();
import AbstractManager from './manager/AbstractManager';
import ActivityManager, { ACTIVITIES_COLLECTION } from './manager/ActivityManager';
import CommentManager from './manager/CommentManager';
import FileManager, { FILES_COLLECTION } from './manager/FileManager';
import SessionManager from './manager/SessionManager';
import TagManager from './manager/TagManager';
import UserManager, { USERS_COLLECTION } from './manager/UserManager';
import DirectoryManager from './manager/DirectoryManager';
import ActivityFileEdgeManager from './manager/ActivityFileEdgeManager';
import DirectoryFileEdgeManager from './manager/DirectoryFileEdgeManager';
import LikeManager, { LIKES_GRAPH, LIKES_COLLECTION } from './manager/LikeManager';
import db from './Database';

db.graph('likes_graph').get().then((res) => {
    console.log(res);
});

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
        DirectoryFileEdgeManager,
        LikeManager,
    ];

    return Promise.all(managers.map((manager: AbstractManager) => {
        manager.getCollection().create().then(
            () => null,
            err => console.log('Collection already exist'),
        );
    }));
}

db.listDatabases().then(async (res) => {
    if(!res.includes(process.env.DB_NAME)) {
        db.createDatabase(process.env.DB_NAME).then(() => {
            initCollections().then(async () => {
                try {
                    await db.graph(LIKES_GRAPH).get();
                } catch (e) {
                    await db.graph(LIKES_GRAPH).create({
                        edgeDefinitions: [{
                            collection: LIKES_COLLECTION,
                            from: [USERS_COLLECTION],
                            to: [ACTIVITIES_COLLECTION, FILES_COLLECTION],
                        }],
                    });
                }
            });
        });
    } else {
        await initCollections();
    }
});
// */
