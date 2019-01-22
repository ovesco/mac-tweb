import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';
import { createUploadLink } from 'apollo-upload-client';
import VueApollo from 'vue-apollo';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, concat, split } from 'apollo-link';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import Store from '../store';
import introspectionQueryResultData from './fragmentTypes.json';
import settings from '../../env.json';
import Bus from '../Bus';

Vue.use(VueApollo);

const AuthMiddleware = new ApolloLink((operation, forward) => {
    if (Store.getters['security/loggedIn']) {
        operation.setContext({
            headers: {
                authorization: Store.state.security.token,
            },
        });
    }
    return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        // eslint-disable-next-line
        graphQLErrors.map(({ message }) => {
            Bus.$emit('graphql-error', message);
        });
    }
    if (networkError) Vue.$toasted.error('Une erreur réseau est survenue');
});

const httpLink = createUploadLink({
    uri: `${settings.url}/graphql`,
});

const wsLink = new WebSocketLink({
    uri: settings.wsUrl,
    options: {
        reconnect: true,
        connectionParams: {
            token: Store.state.security.token,
        },
    },
});

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
});

const cache = new InMemoryCache({
    fragmentMatcher,
    dataIdFromObject: object => object._id || null,
});

const link = split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    concat(AuthMiddleware, httpLink),
);

const apolloClient = new ApolloClient({
    link: ApolloLink.from([
        errorLink,
        link,
    ]),
    cache,
    connectToDevTools: true,
});

export default new VueApollo({
    defaultClient: apolloClient,
});
