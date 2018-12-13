import EdgeManager from './EdgeManager';
import { IFile } from '../schema/File';
import { aql } from 'arangojs';

class ActivityFileEdgeManager extends EdgeManager {
    getDirectoryFiles(directoryId: string) : Promise<Array<IFile>> {
        return this.db.query(aql`
        FOR file IN OUTBOUND ${directoryId} directory_file RETURN file`)
            .then(cursor => cursor.all());
    }
}

export default new ActivityFileEdgeManager('directory_file');
