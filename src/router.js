import Vue from 'vue';
import Router from 'vue-router';
import Network from './Network.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Network,
            children: [
                {
                    path: '/activity',
                    name: 'activity',
                    component: () => import(/* webpackChunkName: "activity" */ './views/Activity.vue'),
                },
                {
                    path: '/profile',
                    name: 'profile',
                    component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue'),
                },
                {
                    path: '/files',
                    name: 'files',
                    component: () => import(/* webpackChunkName: "files" */ './views/Files.vue'),
                },
            ],
        },
        /*
        {
            path: '/about',
            name: 'about',
            component: () => import(/* webpackChunkName: "about" * './views/About.vue'),
        },
        */
    ],
});
