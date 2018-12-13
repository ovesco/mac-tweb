import AbstractManager from './AbstractManager';
import { aql } from 'arangojs';
import { IFile } from '../schema/File';

export const FILES_COLLECTION = 'files';

class FileManager extends AbstractManager {
    getUserFiles(userKey: string) : Promise<Array<IFile>> {
        return this.db.query(
            aql`FOR file IN ${this.collection} FILTER file.userKey == ${userKey} RETURN file`)
            .then(cursor => cursor.all());
    }
}

export default new FileManager(FILES_COLLECTION);
