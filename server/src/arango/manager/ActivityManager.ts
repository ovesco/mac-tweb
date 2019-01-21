import AbstractManager from './AbstractManager';
import { aql } from 'arangojs';
import { IUser } from '../schema/User';

export const ACTIVITIES_COLLECTION = 'activities';

class ActivityManager extends AbstractManager {
    /**
     * Retourne les activités à faire apparaître sur le mur d'un utilisateur, 4 par 4
     * @param user l'utilisateur
     * @param page indice de pagination
     */
    async getUserFeed(user: IUser, page: number) {
        const amount = 4;
        return this.query(aql`
            FOR a IN ${this.collection}
                FILTER a.userKey == ${user._key} || LENGTH(INTERSECTION(a.tags, ${user.followingTags})) > 0
                SORT a.date DESC
                LIMIT ${page*amount}, ${amount}
                RETURN a`).then(cursor => cursor.all()).catch((e) => {
                    console.log(e);
        });
    }
}

export default new ActivityManager(ACTIVITIES_COLLECTION);
