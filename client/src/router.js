import Vue from 'vue';
import VueRouter from 'vue-router';
import goTo from 'vuetify/es5/services/goto';
import Home from './components/Home.vue';
import Donate from './components/Donate.vue';
import Member from './components/Member.vue';
import AuthPage from './components/AuthPage.vue';
import SignOut from './components/SignOut.vue';
import NotFound from './components/NotFound.vue';
import store from './store.js';

Vue.use(VueRouter);

const router = new VueRouter({
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
            name: 'home',
            path: '/',
            component: Home,
        },
        {
            name: 'events',
            path: '/#eventsSection',
            component: Home,
            hash: 'eventsSection'
        },
        {
            name: 'donate',
            path: '/donate',
            component: Donate,
        },
        {
            name: 'member',
            path: '/member',
            component: Member,
            meta: { requiresAuth: true }

        },
        {
            name: 'login',
            path: '/login',
            component: AuthPage,

        },
        {
            name: 'logout',
            path: '/logout',
            component: SignOut,

        },        
        {
            name: "notFound",
            path: "/404",
            alias: "*",
            component: NotFound

        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth )) { //console.log(to.meta.requiresAuth);
        if (!store.state.isAuthenticated) {
            next({
                name: "login",
                query: { redirect: to.fullpath }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;