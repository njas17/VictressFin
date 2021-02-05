import Vue from 'vue';
import App from './App.vue';
import router from './router'
import "vuetify/dist/vuetify.min.css";
import VueTelInputVuetify from "vue-tel-input-vuetify";
import vuetify from './plugins/vuetify';

Vue.use(VueTelInputVuetify, {
  vuetify,
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
