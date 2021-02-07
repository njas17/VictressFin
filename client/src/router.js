import Vue from 'vue';
import VueRouter from 'vue-router';
import goTo from 'vuetify/es5/services/goto';
import Home from './components/Home.vue';
import Member from './components/Member.vue';
import AuthPage from './components/AuthPage.vue';
import SignOut from './components/SignOut.vue';
import NotFound from './components/NotFound.vue';
import store from '@/store'

Vue.use(VueRouter);

// const ifNotAuthenticated = (to, from, next) => {
//     //console.log(store.state.isAuthenticated);
//     // store.dispatch('verifyToken');
//     // console.log(store.getters.isAuthenticated);
//     console.log("i'm not ok", store.getters.getAuthState);
//     if (!store.getters.getAuthState) { 
//         console.log("enter the doom")    
//         next();
//         return;
//     }
//     next("/");
// };

// const ifAuthenticated = (to, from, next) => {
//     console.log("i'm ok", store.getters.getAuthState);
//     if (store.getters.getAuthState) {  
//         next();
//         return;
//     }
//     next("/login");
// };

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
            name: 'member',
            path: '/member',
            component: Member,
            meta: { requiresAuth: true }
            //beforeEnter: ifAuthenticated
        },
        {
            name: 'login',
            path: '/login',
            component: AuthPage,
            //beforeEnter: ifNotAuthenticated,
        },
        {
            name: 'logout',
            path: '/logout',
            component: SignOut,
            //beforeEnter: ifNotAuthenticated,
        },        
        {
            name: "notFound",
            path: "/404",
            alias: "*",
            component: NotFound

        }
    ]
});

//if(to.meta.requiresAuth) {

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.state.user) {
            next({
                name: "login",
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;