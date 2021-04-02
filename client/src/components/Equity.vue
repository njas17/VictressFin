<template>
  <div class="home">
    <BarChart
      class="chart"
      :data-set="data"
      :margin-left="40"
      :margin-top="40"
      :tick-count="5"
      :bar-padding="0.5"
    />
  </div>
</template>

<script>
import BarChart from "./components/BarChart.vue";

export default {
  name: "home",
  data() {
    return {
      data: [
        ["MSCI", 33],
        ["Robin", 24],
        ["Mark", 22],
        ["Joe", 29],
        ["Eve", 38],
        ["Karen", 21],
        ["Kirsty", 25],
        ["Chris", 30]
      ]
    };
  },
  components: {
    BarChart
  }
};
</script>

<style scoped>
.chart {
  margin: 40px auto 0;
  display: block;
}
</style>
