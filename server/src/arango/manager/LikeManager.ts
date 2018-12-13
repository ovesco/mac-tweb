import  { aql } from 'arangojs';
import EdgeManager from './EdgeManager';
import { IUser } from '../schema/User';
import { ILike } from '../schema/Like';

export const LIKES_GRAPH = 'likes_graph';
export const LIKES_COLLECTION = 'likes_collection';

class LikeManager extends EdgeManager {
    async getUserReputation(user: IUser) {
        return this.db.query(aql`
            LET a = (FOR f IN files FILTER f.userKey == ${user._key} RETURN f)
            LET b = (FOR ac IN activities FILTER ac.userKey == ${user._key} RETURN ac)
            FOR c IN APPEND(a, b)
            FOR l IN likes FILTER l._to == c._id
            RETURN l`).then(cursor => cursor.all()) as Promise<ILike>;
    }
}

export default new LikeManager(LIKES_COLLECTION);
