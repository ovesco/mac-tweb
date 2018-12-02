const { gql } = require('apollo-server');
const FileManager = require('../database/manager/FileManager');
const UserManager = require('../database/manager/UserManager');

module.exports.fileTypeDefs = gql`
    extend type Query {
        file(key: ID!): File
    }
    
    type File {
        id: ID!
        filename: String!
        mimeType: String!
        size: Int!
        src: String!
        owner: User
    }
`;

module.exports.fileResolvers = {
    Query: {
        file: async (_, { key }) => FileManager.find(key),
    },
    File: {
        owner: async file => UserManager.find(file.ownerId),
    },
};
