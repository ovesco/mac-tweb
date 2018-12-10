import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import UIModule from './ui';
import SecurityModule from './security';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
});

export default new Vuex.Store({
    modules: {
        ui: UIModule,
        security: SecurityModule,
    },
    plugins: [vuexLocal.plugin],
});
