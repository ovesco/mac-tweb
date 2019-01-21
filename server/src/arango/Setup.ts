require('dotenv').config();
import AbstractManager from './manager/AbstractManager';
import NotificationManager from './manager/NotificationManager';
import ActivityManager, { ACTIVITIES_COLLECTION } from './manager/ActivityManager';
import CommentManager from './manager/CommentManager';
import FileManager, { FILES_COLLECTION } from './manager/FileManager';
import TagManager from './manager/TagManager';
import UserManager, { USERS_COLLECTION } from './manager/UserManager';
import DirectoryManager, { DIRECTORIES_COLLECTION } from './manager/DirectoryManager';
import LikeManager from './manager/LikeManager';
import { EDGES_COLLECTION, EDGES_GRAPH } from './manager/EdgeManager';
import db from './Database';
import Tag from './schema/Tag';

function initCollections() {
    const managers = [
        ActivityManager,
        CommentManager,
        FileManager,
        TagManager,
        UserManager,
        DirectoryManager,
        NotificationManager,
        LikeManager, // Will create edges collection
    ];

    Promise.all(managers.map((manager: AbstractManager) => {
        return manager.getCollection().create().then(
            () => null,
            err => console.log(`collection already exist: ${manager.getCollection().name}`),
        );
    })).then(async () => {
        try {
            await db.graph(EDGES_GRAPH).get();
            console.log('graph already exists');
        } catch (e) {
            await db.graph(EDGES_GRAPH).create({
                edgeDefinitions: [{
                    collection: EDGES_COLLECTION,
                    from: [USERS_COLLECTION, DIRECTORIES_COLLECTION, ACTIVITIES_COLLECTION],
                    to: [ACTIVITIES_COLLECTION, FILES_COLLECTION],
                }],
            });
        }

        await postInstall();
    });
}

async function postInstall() {
    await ['heig-vd', 'il'].forEach(async (tagname) => {
        await TagManager.save(new Tag(tagname));
    });
}

initCollections();
