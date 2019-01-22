import * as Joi from 'joi';
import database from '../Database';
import { IBase } from '../schema/Base';
import { BaseCollection } from 'arangojs/lib/cjs/collection';
import { aql, Database, DocumentCollection } from 'arangojs';
import { ArrayCursor } from 'arangojs/lib/cjs/cursor';

/**
 * Manager abstrait offrant des méthodes génériques
 */
export default abstract class AbstractManager {
    protected db : Database;
    protected collection : BaseCollection;

    /**
     * Constructeur
     * @param collectionName le nom de la collection liée au manager
     */
    constructor(protected collectionName: string) {
        this.db = database;
        this.collection = this.db.collection(collectionName);
    }

    /**
     * Exécute une requête AQL et retourne le résultat
     * @param query
     */
    query(query: any): Promise<ArrayCursor> {
        return this.db.query(query);
    }

    /**
     * Checke un document par sa clé
     * @param key
     * @return IBase|null le document si trouvé, null sinon
     */
    find<T extends IBase>(key: string) : Promise<T> {
        return this.collection.document(key).catch(() => null);
    }

    /**
     * Cherche un document par son ID
     * @param _id
     */
    findById<T extends IBase>(_id: string) : Promise<T> {
        return this.findOneBy({ _id }, true);
    }

    /**
     * Cherche un document sur plusieurs critères
     * @param data objet contenant les critères format clé: valeur
     */
    findBy<T extends IBase>(data: object) : Promise<Array<T>> {
        let index = 1;
        const vars:any = {};
        const terms = Array<string>();
        // Itération sur chaque clé et ajout dans la query
        for(const property in data) {
            if(data.hasOwnProperty(property)) {
                terms.push(`x.${property} == @value${index}`);
                // @ts-ignore
                vars[`value${index++}`] = data[property];
            }
        }
        const query = 'FOR x IN @@value0 FILTER ' + terms.join(' && ') + ' RETURN x';
        return this.query({
            query,
            bindVars: {
                '@value0': this.collection.name,
                ...vars,
            },
        }).then(cursor => cursor.all()).catch(() => {
            console.log('Error in findBy');
        });
    }

    /**
     * Recherche des documents selon les critères et en retourne qu'un
     * @param data les critères
     * @param strict retourne un document seulement si un seul répond aux critères
     */
    findOneBy<T extends IBase>(data: object, strict: boolean) : Promise<T> {
        return this.findBy(data).then(
            result => result.length === 0
                ? null
                : (strict && result.length !== 1 ? null : result[0] as T),
        );
    }

    /**
     * Cherche tous les documents ayant les clés passées
     * @param keys les clés
     */
    findByMultipleKeys<T extends IBase>(keys: Array<String>) : Promise<Array<T>> {
        return this.query(aql`FOR x IN ${this.collection} FILTER x._key IN ${keys} RETURN x`)
            .then(cursor => cursor.all()).catch(() => {
                console.log('BAIL multiplekeys');
            });
    }

    /**
     * Retourne tous les documents dans la collection
     */
    findAll<T extends IBase>() : Promise<Array<T>> {
        return this.collection.all().then(cursor => cursor.all());
    }

    /**
     * Mets à jour un document
     * @param key la clé du document
     * @param item le document
     */
    update<T extends IBase>(key: string, item: T): Promise<T> {
        AbstractManager.validate(item);
        return this.collection.update(key, item).then(() => item);
    }

    /**
     * Enregistre un document
     * @param item l'objet à sauvegarder
     */
    save<T extends IBase>(item: T): Promise<T> {
        AbstractManager.validate(item);
        return (this.collection as DocumentCollection).save(item).then((response : IBase) => {
            item._key = response._key;
            item._id = response._id;
            if (item.date instanceof Date) item.date = item.date.toISOString();
            return item;
        });
    }

    /**
     * Supprimme un document
     * @param item l'objet à supprimer
     */
    remove<T extends IBase>(item: T): Promise<any> {
        // browse edges to remove all liked to this element
        const edges = this.db.collection('edges');
        return this.query(aql`
            FOR item IN ${edges}
                FILTER item._from == ${item._id} || item._to == ${item._id}
                    REMOVE {_key: item._key} IN edges
        `).then(() => this.collection.remove(item)).catch((e) => {
            console.log(e);
        });
    }

    /**
     * Retourne la collection du manager courant
     */
    getCollection(): BaseCollection {
        return this.collection;
    }

    static validate(object: IBase) : Error {
        Joi.validate(object, object._getSchema(), (err) => {
            if (err !== null) throw err.details.map(e => e.message);
        });
        return null;
    }
}
