/* eslint-disable no-param-reassign */
import { onLogin, onLogout } from '../vue-apollo';

export default {
    namespaced: true,
    state: {
        token: null,
    },
    mutations: {
        login(state, token) {
            onLogin(token);
            state.token = token;
        },
        logout(state) {
            onLogout();
            state.token = null;
        },
    },
    getters: {
        loggedIn(state) {
            return state.token !== null;
        },
    },
};
