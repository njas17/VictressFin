import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import "vuetify/dist/vuetify.min.css";
import VueTelInputVuetify from "vue-tel-input-vuetify";
import vuetify from './plugins/vuetify';
import { mapState, mapMutations } from 'vuex';

Vue.use(VueTelInputVuetify, {
  vuetify,
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  computed: mapState([
    'isAuthenticated', 'user'
  ]),
  methods: mapMutations([ 'authenticateTo', 'updateUserObj' ]),
  render: h => h(App)
}).$mount('#app')
