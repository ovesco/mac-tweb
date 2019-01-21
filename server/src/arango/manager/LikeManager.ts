import { aql } from 'arangojs';
import EdgeManager from './EdgeManager';
import { IUser } from '../schema/User';
import { ILike } from '../schema/Like';

export const LIKE_QUALIFIER = 'like';

class LikeManager extends EdgeManager {
    /**
     * Retourne la réputation d'un utilisateur, c'est-à-dire tous les
     * likes qui sont associés à ses fichiers et ses activités
     * @param user
     */
    async getUserReputation(user: IUser) {
        return this.query(aql`
            LET a = (FOR f IN files FILTER f.userKey == ${user._key} RETURN f)
            LET b = (FOR ac IN activities FILTER ac.userKey == ${user._key} RETURN ac)
            FOR c IN APPEND(a, b)
            FOR l IN ${this.collection} FILTER l._to == c._id && l._qualifier == ${LIKE_QUALIFIER}
            RETURN l`).then(cursor => cursor.all()) as Promise<ILike>;
    }
}

export default new LikeManager(LIKE_QUALIFIER);
