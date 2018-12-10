import AbstractManager from './AbstractManager';
import { aql } from 'arangojs';
import { IComment } from '../schema/Comment';

const COMMENTS = 'comments';
class CommentManager extends AbstractManager {
}

export default new CommentManager(COMMENTS);
