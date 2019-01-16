import AbstractManager from './AbstractManager';

export const DIRECTORIES_COLLECTION = 'directories';

class DirectoryManager extends AbstractManager {
}

export default new DirectoryManager(DIRECTORIES_COLLECTION);
