<template>
  <v-app>
    <v-parallax max-height="700px" dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <v-row >
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-thin mb-4">
            Vuetify
          </h1>
          <h4 class="subheading">
            Build your application today!
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
      msg: 'Welcome to Sejiwa.',
    }),
  }
</script>

<style>
  .container {
    padding: 0;
    margin: 0;;
  }
</style>