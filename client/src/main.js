import Vue from 'vue'
import App from './App.vue'
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import Events from './components/Events.vue'
import Member from './components/Member.vue'

Vue.use(Vuetify);
Vue.use(VueRouter);

Vue.config.productionTip = false

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home
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
];

const router = new VueRouter({ mode: 'history', routes: routes })

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
