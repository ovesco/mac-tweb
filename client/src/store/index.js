import Vue from 'vue';
import Vuex from 'vuex';
import UIModule from './ui';
import SecurityModule from './security';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        ui: UIModule,
        security: SecurityModule,
    },
});
