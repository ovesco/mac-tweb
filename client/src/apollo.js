import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import VueApollo from 'vue-apollo';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Store from './store';

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

const httpLink = createUploadLink({
    uri: 'http://localhost:4000/graphql',
});

const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
    link: concat(AuthMiddleware, httpLink),
    cache,
});

export default new VueApollo({
    defaultClient: apolloClient,
    errorHandler: (error) => {
        console.error(error);
    },
});
