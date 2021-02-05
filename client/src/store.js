import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      isAuthenticated: false,
      token: ''
  },
  getters: {
    getToken() {
      this.token = 0;
    }

  },
  mutations: {

  },
  actions: {

  }
})
