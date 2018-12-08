import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client';

// Install the vue plugin
Vue.use(VueApollo);

const AUTH_TOKEN = process.env.LOCAL_AUTH_TOKEN || 'apollo-token';
const httpEndpoint = process.env.GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql';

// Config
const defaultOptions = {
    httpEndpoint,
    wsEndpoint: process.env.GRAPHQL_ENDPOINT_WS || 'ws://localhost:4000/graphql',
    tokenName: AUTH_TOKEN,
    // Enable Automatic Query persisting with Apollo Engine
    persisting: false,
    // Use websockets for everything (no HTTP)
    // You need to pass a `wsEndpoint` for this to work
    websocketsOnly: false,
    // Is being rendered on the server?
    ssr: false,

    // Override default apollo link
    // note: don't override httpLink here, specify httpLink options in the
    // httpLinkOptions property of defaultOptions.
    // link: myLink

    // Override default cache
    // cache: myCache

    // Override the way the Authorization header is set
    // getAuth: (tokenName) => ...

    // Additional ApolloClient options
    // apollo: { ... }

    // Client local data (see apollo-link-state)
    // clientState: { resolvers: { ... }, defaults: { ... } }
};

// Call this in the Vue app file
export function createProvider(options = {}) {
    // Create apollo client
    const { apolloClient, wsClient } = createApolloClient({
        ...defaultOptions,
        ...options,
    });
    apolloClient.wsClient = wsClient;

    // Create vue apollo provider
    const apolloProvider = new VueApollo({
        defaultClient: apolloClient,
        defaultOptions: {
            $query: {
                // fetchPolicy: 'cache-and-network',
            },
        },
        errorHandler(error) {
            // eslint-disable-next-line no-console
            console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message);
        },
    });

    return apolloProvider;
}

// Manually call this when user log in
export function onLogin(/* apolloClient, */ token) {
    if (typeof localStorage !== 'undefined' && token) {
        localStorage.setItem(AUTH_TOKEN, token);
    }
    /*
    if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
    try {
        await apolloClient.resetStore();
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log('%cError on cache reset (login)', 'color: orange;', e.message);
    }
    */
}

// Manually call this when user log out
export function onLogout(/* apolloClient */) {
    if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(AUTH_TOKEN);
    }
    /*
    if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
    try {
        await apolloClient.resetStore();
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log('%cError on cache reset (logout)', 'color: orange;', e.message);
    }
    */
}
