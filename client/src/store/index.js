import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import UIModule from './ui';
import SecurityModule from './security';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    reducer(state) {
        return {
            ui: {
                menuCollapsed: state.ui.menuCollapsed,
            },
            security: state.security,
        };
    },
});

export default new Vuex.Store({
    modules: {
        ui: UIModule,
        security: SecurityModule,
    },
    plugins: [vuexLocal.plugin],
});
