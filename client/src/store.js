import Vue from 'vue'
import Vuex from 'vuex'
import { removeUserSession } from './session';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    isAuthenticated: false
  },
  getters: {
    getAuthState: state => {
      return state.isAuthenticated;
    },
    getUserState: state => {
      return state.user;
    }
  },
  mutations: {
    // sync method
    authenticateTrue: (state, obj) => {
      state.isAuthenticated = true;
      state.user = obj;
    },
    resetUserAuth: (state) => {
      state.isAuthenticated = false;
      state.user = {};
    }
  },
  actions: {
    // can contain async method
    logout({ commit }) {
      removeUserSession();
      commit('resetUserAuth');
    },
  }
})
