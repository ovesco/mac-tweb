import AbstractManager from './AbstractManager';
import { IUser } from '../schema/User';
import { aql } from 'arangojs';

const USERS = 'users';

class UserManager extends AbstractManager {
    findByUsername(username: string) : Promise<IUser> {
        return this.db.query(aql`FOR u IN users FILTER u.username == ${username} RETURN u`)
            .then(cursor => cursor.all().then(result => result.length === 1 ? result[0] : null));
    }
}

export default new UserManager(USERS);
