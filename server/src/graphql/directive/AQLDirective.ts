import { SchemaDirectiveVisitor } from 'graphql-tools';
import { aql } from 'arangojs';
import { gql } from 'apollo-server';
import { defaultFieldResolver } from 'graphql';
import db from '../../arango/Database';

function extractProperty(item: object, property: string) {
    // @ts-ignore
    if (item.hasOwnProperty(property)) return item[property];
    console.log(`Object has no property ${property}`);
    return null;
}

export const AqlDirective = class extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: any) {
        const { query, single } = this.args;
        const unique = single === true;
        field.resolve = (current: object, args: object, context:object) => {
            const bindVars: any = {};
            let index = 1;
            const aqlQuery = query.split(' ').reduce((str: string, item: string) => {
                if(item.charAt(0) === '@') {
                    const [type, property] = item.split('.');
                    let value: any = null;
                    // @ts-ignore
                    if (type === '@current') value = extractProperty(current, property);
                    else if(type === '@args') value = extractProperty(args, property);
                    else if(type === '@context') value = extractProperty(context, property);
                    bindVars[`value${index}`] = value;
                    return `${str} @value${index++} `;
                }
                return `${str} ${item} `;
            }, '');

            return db.query({
                query: aqlQuery,
                bindVars,
            }).then(cursor => cursor.all()).then(result => unique && result.length === 1 ? result[0] : result);
        };
    }
};

export const typeDefs = gql`
    directive @aql(query: String!, single: Boolean) on FIELD_DEFINITION
`;
