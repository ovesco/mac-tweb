import AbstractManager from './AbstractManager';
import { aql } from 'arangojs';

export const ACTIVITIES_COLLECTION = 'activities';

class ActivityManager extends AbstractManager {
    async getUserFeed(userKey: string, page: number) {
        return this.query(aql`
            FOR a IN ${this.collection}
                SORT a.date DESC
                LIMIT ${page*2}, 2
                RETURN a`).then(cursor => cursor.all()).catch((e) => {
                    console.log(e);
        });
    }
}

export default new ActivityManager(ACTIVITIES_COLLECTION);
