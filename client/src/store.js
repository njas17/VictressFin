import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: {},
    isAuthenticated: false
  },
  getters: {
    getToken: state => {
      return state.token;
    },
    getAuthState: state => {
      return state.isAuthenticated;
    },
    getUser: state => {
      return state.user;
    }
  },
  mutations: {
    authenticateTo: (state, b) => {
      state.isAuthenticated = b;
    },
    updateUserObj: (state, obj) => {
      state.user = obj;
    }

  },
  actions: {

  }
})
