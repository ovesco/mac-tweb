import AbstractManager from './AbstractManager';
import { aql } from 'arangojs';
import { IUser } from '../schema/User';

export const ACTIVITIES_COLLECTION = 'activities';

class ActivityManager extends AbstractManager {
    async getUserFeed(user: IUser, page: number) {
        return this.query(aql`
            FOR a IN ${this.collection}
                FILTER a.userKey == ${user._key} || LENGTH(INTERSECTION(a.tags, ${user.followingTags})) > 0
                SORT a.date DESC
                LIMIT ${page*4}, 4
                RETURN a`).then(cursor => cursor.all()).catch((e) => {
                    console.log(e);
        });
    }
}

export default new ActivityManager(ACTIVITIES_COLLECTION);
