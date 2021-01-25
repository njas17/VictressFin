<template>
  <v-app>
    <v-app-bar
      app
      color="#0C090A"
      dark
    >
      <v-img
        alt="Sejiwa Logo"
        class="shrink mr-2"
        contain
        :src="require('@/assets/sejiwa.png')"
        transition="scale-transition"
        width="180"
      />

    <v-spacer></v-spacer>
      <v-btn flat to="/" exact>Home</v-btn>
      <v-btn flat to="/events">Events</v-btn>
      <v-btn flat to="/member">Member</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>

    <v-footer class="default" app padless>
      <v-col class="text-center" cols="12">
        <v-icon class="red--text">favorite</v-icon>
        A student project created at <a class="blue--text" href="http://CodeOp.tech" target="_blank"><strong>CodeOp</strong>,</a>
        Barcelona and TechSprint Academy's <a class="blue--text" href="https://www.rebound.asia/breakthrough" target="_blank"><strong>Rebound.Asia</strong>,</a>
        Kuala Lumpur
        | by team <strong class="red--text">return</strong> <strong class="orange--text">onCloud9;</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
};
</script>
