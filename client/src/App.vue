<template>
  <v-app>
    <v-app-bar app color="grey darken-4" dark>
      <v-img
        alt="Victress Logo"
        class="shrink mr-2"
        contain
        :src="require('@/assets/favicon.png')"
        transition="scale-transition"
        width="63"
      />
      <v-spacer></v-spacer>
      <v-btn text to="/" exact>Home</v-btn>
      <v-btn text to="/#eventsSection">Gender Equality Crowdfunding</v-btn>
      <!-- //@click="$vuetify.goTo(target, options)" -->
      <v-btn text to="/textAnalyzer">Gender Equality Funds</v-btn>

      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark v-bind="attrs" v-on="on" class="bottom">
              Gender Lens Tool Kit
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-btn text to="/GenderLens">Gender Lens Score test</v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn text to="/Quiz">Investor Profiler</v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn text to="/Education">Media Analyzer</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <!-- <v-btn text to="/donutChart">My Gender Lens Donut Chart</v-btn> -->
      <v-btn v-if="!isAuthenticated" text to="/login">Login</v-btn>
      <v-menu v-if="isAuthenticated" bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar color="pink lighten-1" size="38px">
              <span>{{ userInitial }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <h3>{{ userName }}</h3>
              <p class="caption mt-1">{{ userEmail }}</p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text to="/member">Dashboard</v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click="signOut">Logout</v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer class="default" app>
      <v-col class="text-center" cols="12">
        <v-icon class="red--text">favorite</v-icon>
        A Finastra Hackation project
        <a class="cyan--text" href="http://CodeOp.tech" target="_blank"
          ><strong>Unbiased Fintech Future</strong></a
        >
        <a
          class="cyan--text"
          href="https://www.rebound.asia/breakthrough"
          target="_blank"
          ><strong></strong>,</a
        >
        Kuala Lumpur, Malaysia | by Victress Coders
        <strong class="red--text"></strong>
        <strong class="orange--text"></strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import * as easings from "vuetify/es5/services/goto/easing-patterns";
import store from "./store.js";
// import genderLens from './genderLens.vue';

export default {
  name: "App",
  //added components??
  // components: {
  //   genderLens,
  //   financialdashboard,
  //   investCalculator,
  //   Quiz,

  // },

  data() {
    return {
      showLogin: false,
      type: "number",
      number: 1000,
      duration: 1000,
      offset: 500,
      easing: "easeInOutCubic",
      easings: Object.keys(easings),
      items: [
        { title: "Gender Lens Score test" },
        { title: "Investor Profiler" },
        { title: "Media Analyzer" },
      ],
    };
  },
  methods: {
    signOut() {
      store.dispatch("logout");
      this.$router.push({ name: "logout" });
    },
  },
  created() {
    store.dispatch("verifyToken");
  },
  beforeCreate() {
    store.dispatch("verifyToken");
  },
  computed: {
    isAuthenticated() {
      store.dispatch("verifyToken");
      return store.getters.getAuthState;
    },
    target() {
      const value = this[this.type];
      if (!isNaN(value)) return Number(value);
      else return value;
    },
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing,
      };
    },
    userInitial() {
      return store.getters.getUserInitial;
    },
    userName() {
      const user = store.getters.getUserState;
      return user.fullname;
    },
    userEmail() {
      const user = store.getters.getUserState;
      return user.email;
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.cardAlert {
  padding: 20px;
  border-left: 10px solid #00bcd4 !important;
}

.primary {
  background-color: #bdbdbd !important;
}
</style>
