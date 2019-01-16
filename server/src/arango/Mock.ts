require('dotenv').config();
import * as faker from 'faker';
import User, { IUser } from './schema/User';
import SecurityController from '../auth/SecurityController';
import UserManager from './manager/UserManager';
import TagManager from './manager/TagManager';
import Activity from './schema/Activity';
import Tag from './schema/Tag';
import Comment from './schema/Comment';
import CommentManager from './manager/CommentManager';

function getRandomSubarray(arr: Array<any>, size: number) {
    const shuffled = arr.slice(0);
    let i = arr.length;
    let temp;
    let index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

const tags = ['heig', 'il', '2018', 'mac', 'tweb', 'projet', 'students', 'miguel', 'mashallah'];

function random(min: number, max: number) {
    return Math.floor(Math.random() * max) + min;
}

function buildTags() {
    return Promise.all(tags.map(async tag => await TagManager.save(new Tag(tag))));
}

function buildUsers() : Promise<Array<IUser>> {
    return Promise.all([0,1,2,3,4,5,6,7,8,9].map(async () => {
        const user = new User();
        user.email = faker.internet.email();
        user.username = faker.internet.userName();
        user.name = faker.name.firstName() + ' ' + faker.name.lastName();
        user.followingTags = getRandomSubarray(tags, Math.floor((Math.random() * tags.length) + 1));
        user.salt = SecurityController.generateSalt();
        user.password = SecurityController.encodePassword('yoloswag22', user.salt);
        return await UserManager.save(user);
    }));
}

function buildActivities(users: Array<IUser>) {
    return Promise.all([0,1,2,3,4,5,6,7,8,9].map(async (k) => {
        const activity = new Activity();
        const activityTags = getRandomSubarray(tags, Math.floor((Math.random() * tags.length) + 1));
        activity.content = activityTags.reduce((txt, t) => `${txt} #${t}`, 'Une super description');
        activity.tags = await TagManager.extractTags(activity.content);
        activity.userKey = users[k]._key;
        return activity;
    })).then((activities) => {
        return Promise.all(activities.map(async(a) => {
            for (let i = 0; i < random(0, 3); i++) {
                const comment = new Comment(users[random(0, 9)]._id, a._id);
                comment.content = 'Un super comm!';
                await CommentManager.save(comment);
            }
        })).then(() => activities);
    });
}
