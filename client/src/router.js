import Vue from 'vue';
import Router from 'vue-router';
import Network from './rootViews/Network.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ './rootViews/Login.vue'),
        },
        {
            path: '/n',
            name: 'home',
            component: Network,
            children: [
                {
                    path: '/n/activity',
                    name: 'activity',
                    component: () => import(/* webpackChunkName: "activity" */ './views/Activity.vue'),
                },
                {
                    path: '/n/profile',
                    name: 'profile',
                    component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue'),
                },
                {
                    path: '/n/search',
                    name: 'search',
                    component: () => import(/* webpackChunkName: "search" */ './views/Search.vue'),
                },
                {
                    path: '/n/files',
                    name: 'files',
                    component: () => import(/* webpackChunkName: "files" */ './views/Files.vue'),
                },
            ],
        },
    ],
});
