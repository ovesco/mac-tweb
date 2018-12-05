/* eslint-disable no-param-reassign */
export default {
    namespaced: true,
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
    getters: {
        showReader(state) {
            return state.reader.files.length > 0;
        },
        menuCollapsed(state) {
            return state.menuCollapsed;
        },
    },
};
