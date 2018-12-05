import Vue from 'vue';
import Toasted from 'vue-toasted';
import ElementUI from 'element-ui';

import moment from 'moment';
import 'moment/locale/fr';
import VueMoment from 'vue-moment';

import router from './router';
import store from './store/index';
import App from './App.vue';

import './assets/icons';
import './assets/scss/main.scss';
import { createProvider } from './vue-apollo';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(Toasted, {
    position: 'top-center',
    duration: 5000
});
Vue.use(VueMoment, { moment });

new Vue({
    router,
    store,
    apolloProvider: createProvider(),
    render: h => h(App),
}).$mount('#app');
