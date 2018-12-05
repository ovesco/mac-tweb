import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver } from 'graphql';
import { gql } from 'apollo-server';

export const CapitalizeDirective = class extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: any) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async (...args: any) => {
            const result = await resolve.apply(this, args);
            return typeof result === 'string'
                ? result
                    .split(' ')
                    .map(piece => piece.charAt(0).toUpperCase() + piece.substr(1))
                    .join(' ')
                : result;

        };
    }
};

export const typeDefs = gql`
    directive @capitalize on FIELD_DEFINITION
`;
