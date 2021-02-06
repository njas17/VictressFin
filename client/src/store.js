import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, getUser, removeUserSession } from './session';


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
    verifyToken({ dispatch, commit }) {
      const tokenSession = getToken(), userSession = getUser();

      if (!tokenSession || !userSession) {
        commit('resetUserAuth');
        throw "Missing session.";
      }

      fetch("/api/auth/verify-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenSession, userSession })
      })
        .then(response => response.json())
        .then(data => {
          commit('authenticateTrue', data.user);
        })
        .catch(error => {
          console.error("Error in verify token: ", error);
          dispatch('logout');
        });
    },
    logout({ commit }) {
      removeUserSession();
      commit('resetUserAuth');
    },
  }
})
