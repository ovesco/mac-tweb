/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        menuCollapsed: false,
        reader: {
            files: [],
        },
    },
    mutations: {
        collapseMenu: (state, value) => {
            state.menuCollapsed = value;
        },
        addFileToWatch: (state, file) => {
            state.reader.files.push(file);
        },
        clearFilesToWatch: (state) => {
            state.reader.files.splice(0);
        },
    },
    actions: {
    },
});
