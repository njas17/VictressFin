<template>
  <v-app>
    <v-app-bar app color="grey darken-4" dark>
      <v-img alt="Sejiwa Logo" class="shrink mr-2" contain :src="require('@/assets/sejiwa.png')"
        transition="scale-transition" width="180" />
      <v-spacer></v-spacer>
      <v-btn text to="/" exact>Home</v-btn>
      <v-btn text to="/#eventsSection">Events</v-btn> <!-- //@click="$vuetify.goTo(target, options)" -->
      <v-btn text to="/home">Donate</v-btn>
      <v-btn v-if="!isAuthenticated" text to="/login">Login</v-btn>
      <v-btn v-if="isAuthenticated" text to="/member">Member</v-btn>
      <v-btn v-if="isAuthenticated" text @click="signOut">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer class="default" app>
      <v-col class="text-center" cols="12">
        <v-icon class="red--text">favorite</v-icon>
        A student project created at <a class="blue--text" href="http://CodeOp.tech"
          target="_blank"><strong>CodeOp</strong>,</a>
        Barcelona and TechSprint Academy's <a class="blue--text" href="https://www.rebound.asia/breakthrough"
          target="_blank"><strong>Rebound.Asia</strong>,</a>
        Kuala Lumpur
        | by team <strong class="red--text">return</strong> <strong class="orange--text">onCloud9;</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
  import * as easings from 'vuetify/es5/services/goto/easing-patterns';
  import store from './store.js';

  export default {
    name: 'App',
    data() {
      return {
        showLogin: false,
        type: 'number',
        number: 1000,
        duration: 1000,
        offset: 500,
        easing: 'easeInOutCubic',
        easings: Object.keys(easings),
      }
    },
    methods: {
      signOut() {
        store.dispatch("logout");
        this.$router.push({ name: 'logout' });
      }
    },
    created() {
      store.dispatch('verifyToken');
      
    },
    beforeCreate() {
      store.dispatch('verifyToken');
    },
    computed: {
      isAuthenticated() {
        store.dispatch('verifyToken');
        return store.getters.getAuthState;
      },
      target() {
        const value = this[this.type]
        if (!isNaN(value)) return Number(value)
        else return value
      },
      options() {
        return {
          duration: this.duration,
          offset: this.offset,
          easing: this.easing,
        }
      },
    }
  };
</script>

<style>
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
</style>