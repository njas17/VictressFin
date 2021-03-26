<template>
  <div id="app">
    <button class="button" @click="addExperience">Add Parameter</button>
    <div class="Chart">
      <DoughnutExample
        ref="skills_chart"
        :chart-data="chartData"
        :options="options">
      </DoughnutExample>

      <div v-for="(val, i) in currentDataSet" :key="i">
        <input
          type="range" 
          min="0" 
          max="50"
          placeholder="Name"
          :value="currentDataSet[i]"
          @input="updateAmount($event.target.value, i)"
        >
        <span>
          {{ currentDataSet[i] }} points
        </span>
        <input type="text" :value="chartData.labels[i]" @input="updateName($event.target.value, i)">
        <button @click="remove(i)">remove</button>
      </div>

    </div>
  </div>
</template>

<script>
import DoughnutExample from './components/DoughnutExample'
import randomColor from 'randomcolor';

const options = {
  responsive: true, 
  maintainAspectRatio: false, 
  animation: {
    animateRotate: false
  }
}

export default {
  name: "App",
  components: { DoughnutExample },
  data() {
    return {
      options, 
        chartData: {
        labels: ['Parameter 1'],
        datasets: [
          {
            backgroundColor: [randomColor()],
            data: [1]
          }
        ]
      }
    }
  },
  computed: {
    currentDataSet () {
      return this.chartData.datasets[0].data
    }
  },
  methods: {
    updateChart () {
      this.$refs.skills_chart.update();
    },
    updateAmount (amount, index) {
      this.chartData.datasets[0].data.splice(index, 1, amount)
      this.updateChart();
    },
    updateName (text, index) {
      this.chartData.labels.splice(index, 1, text)
      this.updateChart();
    },
    addExperience() {
      const currentDataset = this.chartData.datasets[0]
      this.chartData.labels.push(`Parameter ${currentDataset.data.length + 1}`)
      currentDataset.data.push(0)
      currentDataset.backgroundColor.push(randomColor())
      this.updateChart();
    },
    remove (index) {
      const currentDataset = this.chartData.datasets[0]
      currentDataset.data.splice(index, 1)
      this.chartData.labels.splice(index, 1)
      currentDataset.backgroundColor.splice(index, 1)
      this.updateChart()
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
