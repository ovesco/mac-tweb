import EdgeManager from './EdgeManager';

export const COMMENT_QUALIFIER = 'comment';
class CommentManager extends EdgeManager {
}

export default new CommentManager(COMMENT_QUALIFIER);
