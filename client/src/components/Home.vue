<template>
  <v-app>
    <v-parallax dark src="https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg">
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