<template>
  <div container="app">
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
       
    
    
  </div>
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