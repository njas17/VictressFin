<template>
  <v-app>
    <v-parallax dark src="https://firebasestorage.googleapis.com/v0/b/sehati-sejiwa.appspot.com/o/rene-bernal-small-unsplash.jpg?alt=media&token=50bb87b9-3227-44ad-b9f6-7c8b14666d80">
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
  .v-main__wrap, .container, .container--fluid {
    padding: 0 !important;
  }

  .v-parallax {
    height: 550px !important;
  }
</style>