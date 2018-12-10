/* eslint-disable no-param-reassign */
import { onLogin, onLogout } from '../vue-apollo';

export default {
    namespaced: true,
    state: {
        token: null,
        userKey: null,
    },
    mutations: {
        login(state, { token, userKey }) {
            onLogin(token);
            state.userKey = userKey;
            state.token = token;
        },
        logout(state) {
            onLogout();
            state.userKey = null;
            state.token = null;
        },
    },
    getters: {
        loggedIn(state) {
            return state.token !== null && state.userKey !== null;
        },
    },
};
