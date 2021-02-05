import Vue from 'vue';
import Router from 'vue-router';

import Home from './components/Home.vue';
import Events from './components/Events.vue';
import Member from './components/Member.vue';
import AuthPage from './components/AuthPage.vue';

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            name: 'Home',
            path: '/',
            component: Home,
        },
        {
            name: 'Events',
            path: '/events',
            component: Events
        },
        {
            name: 'Member',
            path: '/member',
            component: Member
        },
        {
            name: 'Login',
            path: '/login',
            component: AuthPage
        },
    ]
})