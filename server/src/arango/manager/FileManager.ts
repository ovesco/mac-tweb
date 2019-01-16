import AbstractManager from './AbstractManager';
import { aql } from 'arangojs';
import { IFile } from '../schema/File';

export const FILES_COLLECTION = 'files';

class FileManager extends AbstractManager {
    search(text: string, tags: Array<string>): Promise<IFile> {
        const textQuery = `%${text}%`;
        return this.query(aql`
        FOR f IN files FILTER f.filename LIKE ${textQuery}
            OR LENGTH(INTERSECTION(f.tags, ${tags})) > 0 RETURN f`).then(cursor => cursor.all());
    }
}

export default new FileManager(FILES_COLLECTION);
