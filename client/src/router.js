import Vue from 'vue';
import Router from 'vue-router';
import goTo from 'vuetify/es5/services/goto';

import Home from './components/Home.vue';
import Member from './components/Member.vue';
import AuthPage from './components/AuthPage.vue';

Vue.use(Router)

export default new Router({
    mode: 'history',
    scrollBehavior: (to, from, savedPosition) => {
        let scrollTo = 0

        if (to.hash) {
            scrollTo = to.hash
        } else if (savedPosition) {
            scrollTo = savedPosition.y
        }

        return goTo(scrollTo)
    },
    routes: [
        {
            name: 'Home',
            path: '/',
            component: Home,
        },
        {
            name: 'Events',
            path: '/#eventsSection',
            component: Home,
            hash: 'eventsSection'
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