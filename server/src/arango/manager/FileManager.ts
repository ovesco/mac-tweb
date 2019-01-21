import AbstractManager from './AbstractManager';
import { aql } from 'arangojs';
import { IFile } from '../schema/File';

export const FILES_COLLECTION = 'files';

class FileManager extends AbstractManager {
    /**
     * Recherche des fichiers selon le nom et les tags
     * @param text le nom du fichier
     * @param tags les tags à chercher
     * @param page indice de pagination
     * @param amount quantité de fichiers à afficher pour la pagination
     */
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

    /**
     * Trouve les fichiers de l'utilisateur
     * @param userKey la clé de l'utilisateur
     * @param begin indice de pagination
     * @param amount quantité à afficher
     */
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
