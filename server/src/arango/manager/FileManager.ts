import AbstractManager from './AbstractManager';
import { aql } from 'arangojs';
import { IFile } from '../schema/File';

const FILES = 'files';

class FileManager extends AbstractManager {
    getUserFiles(userKey: string) : Promise<Array<IFile>> {
        return this.db.query(
            aql`FOR file IN ${FILES} FILTER file.userKey == ${userKey} RETURN file`)
            .then(cursor => cursor.all());
    }

    getActivityFiles(activityId: string) : Promise<Array<IFile>> {
        return this.db.query(aql`
        FOR file IN OUTBOUND ${activityId} activity_file RETURN file`)
            .then(cursor => cursor.all());
    }
}

export default new FileManager(FILES);
