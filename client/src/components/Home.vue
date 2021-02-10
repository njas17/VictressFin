<template>
  <v-app>
    <v-parallax dark src="https://images.unsplash.com/photo-1503847752244-32e931070a43?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1886&q=80">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-thin mb-4">
            {{msg}} <v-icon class="red--text">favorite</v-icon>
          </h1>
          <h4 class="subheading">
            "Even if you just change one life, you’ve changed the world forever.” – Mike Satterfield
          </h4>
        </v-col>
      </v-row>
    </v-parallax>
    <events />
  </v-app>
</template>

<script>
  import Events from './Events.vue';

  export default {
    name: 'home',
    components: { Events },
    data: () => ({
      msg: 'Welcome to Sejiwa ',
    }),
  }
</script>

<style>
</style>