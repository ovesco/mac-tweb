import { gql } from 'apollo-server';
import FileManager from '../../arango/manager/FileManager';
import Uploader from '../../fs/Uploader';
import {IFile, IActivityFileInput } from '../../arango/schema/File';
import { getUser } from './Helper';
import { ISecurityContext } from '../../auth/SecurityController';
import ActivityManager from '../../arango/manager/ActivityManager';
import ActivityFileEdgeManager from '../../arango/manager/ActivityFileEdgeManager';
import ActivityFileEdge from '../../arango/schema/ActivityFileEdge';
import { IActivity } from '../../arango/schema/Activity';


export const typeDefs = gql`
    extend type Query {
        file(_key: ID!): File
    }

    extend type Mutation {
        uploadActivityFile(fileInput: ActivityFileInput!): File
    }

    input ActivityFileInput {
        activityId: String!
        upload: Upload!
    }

    type File {
        _id: ID!
        _key: ID!
        date: String!
        description: String!
        filename: String!
        mimeType: String!
        size: Int!
        userKey: ID!
        user: User
        src: String
        tags: [String]
        likes: [Like] @aql(query: "FOR l IN likes FILTER l._to == @current._id RETURN l")
    }
`;
export const resolvers = {
    Query: {
        file: async (_:any, { _key } : { _key: string }) => FileManager.find(_key),
    },
    File: {
        user: async (file: IFile) => getUser(file.userKey),
    },
    Mutation: {
        uploadActivityFile: async (parent: any, { fileInput } : { fileInput: IActivityFileInput },
                                   context: ISecurityContext) : Promise<IFile> => {
            return ActivityManager.findById(fileInput.activityId).then((activity) => {
                return Uploader.saveFile(context.user, fileInput.upload).then((file) => {
                    const { tags, content } = (activity as IActivity);
                    file.tags = tags;
                    file.description = content;
                    return FileManager.save(file).then((fileUpdated) => {
                        return ActivityFileEdgeManager
                            .save(new ActivityFileEdge(activity._id, fileUpdated._id))
                            .then(() => fileUpdated);
                    });
                });
            });
        },
    },
};
