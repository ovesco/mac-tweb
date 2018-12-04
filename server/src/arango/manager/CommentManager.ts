import AbstractManager from './AbstractManager';
import { aql } from 'arangojs';
import { IComment } from '../schema/Comment';

const COMMENTS = 'comments';
class CommentManager extends AbstractManager {
    getUserComments(userKey: string) : Promise<Array<IComment>> {
        return this.db.query(
            aql`FOR comment IN ${COMMENTS} FILTER comment.userKey == ${userKey} RETURN comment`)
            .then(cursor => cursor.all());
    }
}

export default new CommentManager(COMMENTS);
