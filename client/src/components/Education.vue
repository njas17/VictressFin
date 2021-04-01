<template>
  <v-app>
    <v-container class="bv-example-row" fill-height fluid>
      <v-row id="editor" ref="editor" align="center">
        <v-col align="center">
          <iframe
            v-if="loaded"
            style="max-height:none!important; border-radius: 5px; margin-left: 55px;"
            src="https://gendergaptracker.research.sfu.ca/apps/textanalyzer"
            :height="555"
            :width="665"
            frameborder="0"
          ></iframe>
        </v-col>
        <v-col>
          <iframe
            v-if="loaded"
            style="max-height:none!important; border-radius: 5px; margin-left: 30px;"
            src="https://www.independent.co.uk/topic/gender-equality"

            :height="555"
            :width="520"
            frameborder="0"
          ></iframe>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
  <!-- <div container="app">
    <div id="editor" ref="editor"></div>

    <b-container class="bv-example-row">
  <b-row>
    <b-col>
    <iframe
      v-if="loaded"
      src="https://gendergaptracker.research.sfu.ca/apps/textanalyzer"
      allowfullscreen
      :height="1500"
      :width="900"
      frameborder="0"
    ></iframe>
    </b-col>
  </b-row>
</b-container>
    <b-row>
      <b-col><iframe
        v-if="loaded"
        style="max-width: 500px; min-width: 250px; max-height:none!important; padding: 0px; padding-right: 10px;"
        src="https://www.independent.co.uk/topic/gender-equality"

        :height="1500"
        :width="500"
        frameborder="0"
      ></iframe></b-col>
    </b-row>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      loaded: false,
      iframe: {
        src: window.location.href,
        style: null,
        wrapperStyle: null,
      },
    };
  },
  mounted() {
    let editor = this.$refs.editor;
    this.iframe.style = {
      position: "absolute",
      width: window.innerWidth,
      height: window.innerHeight,
      top: -editor.offsetTop + "px",
      left: -editor.offsetLeft + "px",
    };
    this.iframe.wrapperStyle = {
      overflow: "hidden",
      height: editor.clientHeight + "px",
      width: editor.clientWidth + "px",
    };
    this.loaded = true;
  },
};
</script>

<style scoped>
  v-container {
    display: flex;
  }
</style>