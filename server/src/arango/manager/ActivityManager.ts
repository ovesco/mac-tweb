import AbstractManager from './AbstractManager';
import { aql } from 'arangojs';

class ActivityManager extends AbstractManager {
    async getUserFeed(userKey: string) {
        return this.db.query(aql`
        FOR a IN activities FILTER a.userKey == ${userKey} SORT a.date DESC
                LIMIT 10 RETURN a`).then(cursor => cursor.all());
    }
}

export default new ActivityManager('activities');
