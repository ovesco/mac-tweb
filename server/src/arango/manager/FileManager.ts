import AbstractManager from './AbstractManager';
import { aql } from 'arangojs';
import { IFile } from '../schema/File';

export const FILES_COLLECTION = 'files';

class FileManager extends AbstractManager {
    async search(text: string, tags: Array<string>, page: number, amount: number): Promise<IFile> {
        const textQuery = `%${text}%`;
        return this.query(aql`
        LET files = (
        FOR f IN files
            FILTER f.filename LIKE ${textQuery}
            AND LENGTH(INTERSECTION(f.tags, ${tags})) > 0
            SORT f.date DESC
            LIMIT ${page*amount}, ${amount}
            RETURN f
        )
        LET amount = (
        FOR f IN files
            FILTER f.filename LIKE ${textQuery}
            AND LENGTH(INTERSECTION(f.tags, ${tags})) > 0
            RETURN f
        )
        RETURN { amount: COUNT(amount), files: files }
        `).then(cursor => cursor.all()).then(res => res[0]).catch((e) => {
                console.log(e);
        });
    }

    async findUserFiles(userKey: string, begin: number, amount: number) {
        return this.query(aql`
        LET files = (
        FOR f IN ${this.collection}
            FILTER f.userKey == ${userKey}
            SORT f.date DESC
            LIMIT ${begin*amount}, ${amount}
            RETURN f
        )
        RETURN {
            amount: COUNT(for fi IN ${this.collection} FILTER fi.userKey == ${userKey} RETURN fi),
            files: files
        }
        `).then(cursor => cursor.all()).then(res => res[0]);
    }
}

export default new FileManager(FILES_COLLECTION);
