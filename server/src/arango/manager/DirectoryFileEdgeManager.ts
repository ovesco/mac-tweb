import EdgeManager from './EdgeManager';
import { IFile } from '../schema/File';
import { aql } from 'arangojs';

const DIRECTORY_FILE_QUALIFIER = 'directory_file';

class DirectoryFileEdgeManager extends EdgeManager {
    /**
     * Retourne les fichiers paginés d'un dossier, ainsi que le nombre total
     * @param id l'id du dossier
     * @param begin début de pagination
     * @param amount quantité souhaitée
     */
    async getDirectoryFiles(id: string, begin: number, amount: number) : Promise<Array<IFile>> {
        return this.query(aql`
        LET amount = (
            FOR file IN OUTBOUND ${id} ${this.collection}
            RETURN file
        )
        LET files = (
            FOR file IN OUTBOUND ${id} ${this.collection}
            LIMIT ${begin*amount}, ${amount}
                RETURN file
        )
        RETURN { files: files, amount: COUNT(amount) }`).then(cursor => cursor.all()).then(res => res[0]);
    }
}

export default new DirectoryFileEdgeManager(DIRECTORY_FILE_QUALIFIER);
