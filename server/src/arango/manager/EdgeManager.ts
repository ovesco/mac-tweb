import AbstractManager from './AbstractManager';
import * as Joi from 'joi';
import { aql, EdgeCollection } from 'arangojs';
import { IEdge } from '../schema/Edge';
import { IBase } from '../schema/Base';

export const EDGES_COLLECTION = 'edges';
export const EDGES_GRAPH = `${process.env.DB_NAME}_graph`;

/**
 * Manager de base pour gérer les arcs du graphe de documents
 * Une seule collection est utilisée pour représenter tous les graphes,
 * ils sont ensuite diférenciés au moyen d'un attribut _qualifier
 */
export default abstract class extends AbstractManager {

    /**
     * Constructeur, récupère la collection edges
     * @param edgeQualifier la valeur de _qualifier
     */
    constructor(protected edgeQualifier: string) {
        super(EDGES_COLLECTION);
        this.collection = this.db.edgeCollection(EDGES_COLLECTION);
    }

    /**
     * Supprimme un arc selon son origine et sa destination
     * @param _from
     * @param _to
     */
    removeEdge(_from: string, _to: string): Promise<null> {
        return this.query(aql`
        FOR x IN ${this.collection}
            REMOVE { _from == ${_from} && _to == ${_to} && _qualifier == ${this.edgeQualifier} }
                IN ${this.collection}`).then(() => null);
    }

    /**
     * Sauve un arc s'il n'existe pas encore
     * @param item
     */
    saveIfNoExist(item: IEdge): Promise<IEdge> {
        return <Promise<IEdge>>this.findOneBy({ _from: item._from, _to: item._to, _qualifier: this.edgeQualifier }, true)
            .then((existing: IEdge) => {
                if (existing) {
                    return new Promise((resolve) => {
                        resolve(existing);
                    });
                }
                return this.save(item);
            });
    }

    /**
     * Surcharge pour inclure le _qualifier
     * @param data
     */
    findBy<T extends IBase>(data: object) : Promise<Array<T>> {
        (data as any)._qualifier = this.edgeQualifier;
        return super.findBy(data);
    }

    /**
     * Surcharge pour inclure le _qualifier
     * @param item
     */
    save<T extends IBase>(item: T): Promise<T> {
        (item as any)._qualifier = this.edgeQualifier;
        Joi.assert(item, item._getSchema());
        return (this.collection as EdgeCollection).save(item).then((response : IEdge) => {
            item._key = response._key;
            item._id = response._id;
            if (item.date instanceof Date) item.date = item.date.toISOString();
            return item;
        });
    }
}
