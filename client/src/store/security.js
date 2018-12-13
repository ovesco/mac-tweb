/* eslint-disable no-param-reassign */
export default {
    namespaced: true,
    state: {
        token: null,
        userKey: null,
    },
    mutations: {
        login(state, { token, userKey }) {
            state.userKey = userKey;
            state.token = token;
        },
        logout(state) {
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
