import Vue from 'vue'
import App from './App.vue'
// import vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"
import VueTelInputVuetify from "vue-tel-input-vuetify";
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import Events from './components/Events.vue'
import Member from './components/Member.vue'
import SignUp from './components/SignUp.vue'

Vue.use(VueTelInputVuetify, {
  vuetify,
});
Vue.use(VueRouter);

Vue.config.productionTip = false

const routes = [
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
    path: '/signin',
    component: SignUp 
  },
];

const router = new VueRouter({ mode: 'history', routes: routes })


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
