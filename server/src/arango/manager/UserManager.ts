import AbstractManager from './AbstractManager';
import { IUser } from '../schema/User';
import { aql } from 'arangojs';

export const USERS_COLLECTION = 'users';

class UserManager extends AbstractManager {
    findByUsername(username: string) : Promise<IUser> {
        return this.db.query(aql`FOR u IN ${this.collection} FILTER u.username == ${username} RETURN u`)
            .then(cursor => cursor.all().then(result => result.length === 1 ? result[0] : null));
    }
}

export default new UserManager(USERS_COLLECTION);
