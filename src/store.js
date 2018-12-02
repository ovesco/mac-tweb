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
        removeReaderFile: (state, file) => {
            const index = state.reader.files.indexOf(file);
            if (index > -1) state.reader.files.splice(index, 1);
        },
    },
    actions: {
    },
});
