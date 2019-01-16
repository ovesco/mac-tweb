import EdgeManager from './EdgeManager';
import { IFile } from '../schema/File';
import { aql } from 'arangojs';

const DIRECTORY_FILE_QUALIFIER = 'directory_file';

class DirectoryFileEdgeManager extends EdgeManager {
    async getDirectoryFiles(id: string, begin: number, amount: number) : Promise<Array<IFile>> {
        return this.query(aql`
        FOR file IN OUTBOUND ${id} ${this.collection}
            LIMIT ${begin*amount}, ${amount}
                RETURN file`)
            .then(cursor => cursor.all());
    }

    async countFiles(directoryId: string) {
        return this.query(aql`
        FOR file IN OUTBOUND ${directoryId} ${this.collection}
            COLLECT WITH COUNT INTO amount
            RETURN amount`)
            .then(cursor => cursor.all()).then(res => res[0]);
    }
}

export default new DirectoryFileEdgeManager(DIRECTORY_FILE_QUALIFIER);
