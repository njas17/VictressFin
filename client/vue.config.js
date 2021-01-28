module.exports = {
  "devServer": {
    "proxy": {
      "^/api": {
        "target": "http://localhost:5000",
        "changeOrigin": true
      }
    }
  },
  "transpileDependencies": [
    "vuetify",
    "vue-tel-input-vuetify"
  ]
}