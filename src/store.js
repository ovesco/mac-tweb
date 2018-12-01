/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        menuCollapsed: false,
    },
    mutations: {
        collapseMenu: (state, value) => {
            state.menuCollapsed = value;
        },
    },
    actions: {
    },
});
