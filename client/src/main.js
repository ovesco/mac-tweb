import Vue from 'vue';
import ElementUI from 'element-ui';

import moment from 'moment';
import 'moment/locale/fr';
import VueMoment from 'vue-moment';

import router from './router';
import store from './store';
import App from './App.vue';

import './assets/icons';
import './assets/scss/main.scss';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueMoment, { moment });

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
