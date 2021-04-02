<template>
  <div class="App">
    <div class="media-body container-fluid float-right">
      <apexchart type="bar" :options="options" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      options: {
        chart: {
          id: "bar-chart",
        },
        xaxis: {
          categories: [
            "MSCI EM Ex BRIC",
            "MSCI World No Tobacco, Alcohol, Weapons",
            "MSCI World",
            "MSCI World Sharia Compliant",
            "MSCI WORLD ex EMU NR EUR",
            "BFGEI:IND Bloomberg Financial Services Gender-Equality Index",
          ],
        },
        colors: ["#008080"],
      },
      series: [
        {
          name: "average-grades",
          data: [7.75, 20.48, 16.5, 9.0, 7.76, 58.28],
        },
      ],
    };
  },

  //   created() {
  //     this.getBenchmack();
  //   },
  //   methods: {
  //     async getBenchmark() {
  //       try {
  //         const response = await axios.get(
  //           "../assets/GetAllBenmarkResponse.json"
  //         );
  //         this.info = response.data;
  //         console.log(response.data);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     },
  // getBenchmark() {
  //   fetch("http://localhost:3000/benchmarks", {})
  //     .then((response) =>
  //       // this.info = response.data
  //       console.log(response, "<<response")
  //     )
  //     .catch((err) => {
  //       console.error("Error", err);
  //     });
  //   return this.info;
  // },
  //   },
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
