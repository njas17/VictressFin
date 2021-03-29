<template>
  <div id="app">
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Compound Investment Calculator 
          </h1>
          <h2 class="subtitle">by Victress</h2>
        </div>
      </div>
    </section>
    
    <div class="container">
      <p class="ins">
        Enter your values to see the potential returns of your investments
      </p>

      <div class="columns">
        <div class="column">
          <label>Investment Amount</label>
          <input
            class="input"
            type="number"
            v-on:blur="calc"
            v-model.number="loan.principal"
          />
        </div>
        <div class="column">
          <label>Dividend rate/Return on Capital</label>
          <input
            class="input"
            type="text"
            v-on:blur="calc"
            v-model.number="loan.interest"
          />
        </div>
        <div class="column">
          <label>Time in Years</label>
          <input
            class="input"
            type="number"
            v-on:blur="calc"
            v-model.number="loan.timeYears"
          />
        </div>
        <div class="column">
          <label>Compounded (months)</label>
          <input
            class="input"
            type="number"
            v-on:blur="calc"
            v-model.number="loan.compoundingEvery"
          />
        </div>
      </div>
      <button class="button is-info" v-on:click="calc">Compute</button>

      <div class="columns">
        <div class="column">
          <div class="notification is-success">
            <h3>Monthly Payment</h3>
            <p>${{ formatPrice(loan.payment) }}</p>
          </div>
        </div>
        <div class="column">
          <div class="notification is-warning">
            <h3>Grand Total</h3>
            <p>${{ formatPrice(loan.total) }}</p>
          </div>
        </div>
        <div class="column">
          <div class="notification is-danger">
            <h3>Total Interest</h3>
            <p>${{ formatPrice(loan.totalInterest) }}</p>
          </div>
        </div>
      </div>

      <div class="notification">
        <h2 class="title">Compound Interest Formula</h2>
        <p>
          principal ( 1 + <sup>interest </sup> / <sub> compounded </sub>)
          <sup>compounded * time </sup> =
          <sup
            >payment [ ( 1 + <sup>interest</sup> / <sub> compounded </sub>)
            <sup>compounded * time</sup> - 1 ]
          </sup>
          / <sub> <sup>interest</sup> / <sub> compounded </sub> </sub>
        </p>

        <p>
          {{ loan.principal }} ( 1 + <sup>{{ loan.interest }}</sup> /
          <sub> {{ loan.compoundingEvery }} </sub>)
          <sup>{{ loan.compoundingEvery }} * {{ loan.timeYears }}</sup> =
          <sup
            >payment [ ( 1 + <sup>{{ loan.interest }}</sup> /
            <sub> {{ loan.compoundingEvery }} </sub>)
            <sup>{{ loan.compoundingEvery }} * {{ loan.timeYears }}</sup> - 1 ]
          </sup>
          /
          <sub>
            <sup>{{ loan.interest }}</sup> /
            <sub> {{ loan.compoundingEvery }} </sub>
          </sub>
          <br />
          {{ loan.l }} = payment( {{ loan.r }} )
          <br />

          {{ loan.payment }} = payment
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: "investCalculator",
  props: {
    // msg: String,
  },
  // el: "#app",
  data() {
    loan: {
      principal: 100000
      interest: 0.03
      compoundingEvery: 12
      timeYears: 1
      payment: 1
      total: 1
      totalInterest: 2
      l: 1
      r: 1
    }
  },

  methods: {
    calculate: function () {
      this.loan.l =
        this.loan.principal *
        (1 + this.loan.interest / this.loan.compoundingEvery) **
          (this.loan.compoundingEvery * this.loan.timeYears);
      this.loan.r =
        ((1 + this.loan.interest / this.loan.compoundingEvery) **
          (this.loan.compoundingEvery * this.loan.timeYears) -
          1) /
        (this.loan.interest / this.loan.compoundingEvery);
      this.loan.payment = Math.round((this.loan.l / this.loan.r) * 100) / 100;
      this.loan.total =
        Math.round(
          this.loan.payment *
            this.loan.compoundingEvery *
            this.loan.timeYears *
            100
        ) / 100;
      this.loan.totalInterest =
        Math.round((this.loan.total - this.loan.principal) * 100) / 100;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2);
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
app.calculate();
</script>

<style scoped>
label {
  color: #aaa;
}
input,
button,
label,
p {
  margin-bottom: 0.5em;
}
#app {
  padding: 0 10px;
}
.columns p {
  font-weight: bold;
  line-height: 40px;
}
.columns,
#app {
  margin-top: 1em;
}
.ins {
  margin-top: 2em;
}
.hero {
  padding-top: 5vh;
}
</style>