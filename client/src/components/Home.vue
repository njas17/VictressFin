<template>
  <v-app>
      <v-carousel hide-delimiters height="570px" show-arrows-on-hover cycle interval="8000" >
        <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
          <v-container fill-height>
            <v-row class="white--text mx-auto">
              <v-col class="white--text text-left">
                <span>
                  <p class="animated fadeInUp display-2">{{ quote[i] }}</p>
                </span><br/>
                <span>
                  <p class="animated fadeInUp delay-1s display-1">{{ writer[i] }}</p>
                </span><br/>
              </v-col>
            </v-row>
          </v-container>
        </v-carousel-item>
      </v-carousel>
    <!-- <v-parallax dark src="https://firebasestorage.googleapis.com/v0/b/sehati-sejiwa.appspot.com/o/rene-bernal-small-unsplash.jpg?alt=media&token=50bb87b9-3227-44ad-b9f6-7c8b14666d80">
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
    </v-parallax> -->
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
      items: [
        {
          src: "https://firebasestorage.googleapis.com/v0/b/sehati-sejiwa.appspot.com/o/pexels-pixabay-99551.jpg?alt=media&token=6ce73ebd-2ca5-4eca-b3d3-4a9c86522cc1"
        },
        {
          src: "https://firebasestorage.googleapis.com/v0/b/sehati-sejiwa.appspot.com/o/hudson-hintze-vpxeE7s-my4-unsplash.jpg?alt=media&token=ba62b28a-30e5-47e8-9ab8-a461facf33c4"
        },
        {
          src: "https://firebasestorage.googleapis.com/v0/b/sehati-sejiwa.appspot.com/o/michael-fenton-0ZQ8vojHNuc-unsplash.jpg?alt=media&token=597b6edf-49b3-45b6-a589-5e6511b8711b"
        },
        {
          src: "https://firebasestorage.googleapis.com/v0/b/sehati-sejiwa.appspot.com/o/rene-bernal-large-unsplash.jpg?alt=media&token=d5abca30-db32-4464-aa87-7aada0abe513"
        },
      ],
      quote: ["We make a living by what we get, but we make a life by what we give.", "Even if you just change one life, you’ve changed the world forever.", "Volunteers do not necessarily have the time; they just have the heart.", "The smallest act of kindness is worth more than the grandest intention."],
      writer: ["– Winston Churchill", "– Mike Satterfield", "– Elizabeth Andrew", "– Oscar Wilde"]
    }),
  }
</script>

<style>
  .v-main__wrap, .container, .container--fluid {
    padding: 0 !important;
  }

  /* .v-parallax {
    height: 600px !important;
  } */

  .animated {
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    }

    .animated.delay-1s {
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            -webkit-transform: translate3d(0, 100%, 0);
            transform: translate3d(0, 100%, 0);
        }

        to {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    }

    .fadeInUp {
        -webkit-animation-name: fadeInUp;
        animation-name: fadeInUp;
    }
</style>