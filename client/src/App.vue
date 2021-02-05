<template>
  <v-app>
    <v-app-bar app color="deep-purple darken-4" dark>
      <v-img alt="Sejiwa Logo" class="shrink mr-2" contain :src="require('@/assets/sejiwa.png')"
        transition="scale-transition" width="180" />

      <v-spacer></v-spacer>
      <v-btn text to="/" exact>Home</v-btn>
      <v-btn text to="/home/events">Events</v-btn>
      <v-btn text to="/home">Donate</v-btn>
      <v-btn v-if="!isAuthenticated" text to="/login">Login</v-btn>
      <v-btn v-if="isAuthenticated" text to="/member">Member</v-btn>
      <v-btn v-if="isAuthenticated" text to="/logout">Logout</v-btn>
    </v-app-bar>

    <v-main padless>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer class="default" app padless>
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

  export default {
    name: 'App',
    data() {
      return {
        isAuthenticated: false,
        showLogin: false
      }
    },
    methods: {
    

    }
  };
</script>

<style scoped>
  body,
  .container {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
</style>