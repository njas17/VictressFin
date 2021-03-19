<template>
<div id="app-2">
<section class="score-info">
  <div class="score-body">
    <div class="container">
      <h1 class="title">
        Gender Lens Scorecard
      </h1>
      <h2 class="subtitle">
        by Victress
      </h2>      
    </div>
  </div>
</section>

  <div class="container">
    <p class="ins">
    Lets check your gender lens investing score!
      </p><p> 5=Role Model
              4=Advancing to Role Model
              3=Getting There
              2=More Work to Do
              1=We Need to Talk</p>
    

      <div class="columns">
  
    <div class="column">    
      <label>Pay Equity</label>
      <label>Women/men compensation ratio for hourly employees (percent of women’s to men’s)
      <p>Formula: (Last Twelve Months Average Compensation Women Workers/</p>
<p>Last Twelve Months Average Compensation for Men Workers (Men)</p></label>
      <input class="input" type="number" v-on:blur="calc" v-model.number="loan.equity">
    </div>
    <div class="column">    
      <label>Women Workforce
Participation</label>
      <input class="input" type="text" v-on:blur="calc" v-model.number="loan.interest">
    </div>
    <div class="column">    
      <label>Gender-Diverse Leadership
and Governance</label>
      <input class="input" type="number" v-on:blur="calc" v-model.number="loan.timeYears">
    </div>
    <div class="column">    
      <label>Benefits and Professional
Development</label>
      <input class="input" type="number" v-on:blur="calc" v-model.number="loan.compoundingEvery">
    </div>
        <div class="column">    
      <label>Women-Powered Value
Chains</label>
      <input class="input" type="number" v-on:blur="calc" v-model.number="loan.compoundingEvery">
    </div>
        <div class="column">    
      <label>Safe And Healthy Workplace
Environment</label>
      <input class="input" type="number" v-on:blur="calc" v-model.number="loan.compoundingEvery">
    </div>
  </div>
<button class="button is-info" v-on:click="calc">Compute</button>

    <div class="columns">
      <div class="column">
        <div class="notification is-success">
          <h3>Score Param 1</h3>
          <p>${{ formatPrice(loan.payment) }}</p>
        </div>
      </div>
      <div class="column">
        <div class="notification is-warning">
        <h3>Score Param 2</h3>
        <p>${{ formatPrice(loan.total) }}</p>
        </div>
      </div>
      <div class="column">
        <div class="notification is-danger">

        <h3>Total Returns</h3>
        <p>${{ formatPrice(loan.totalInterest) }}</p>
        </div>
      </div>

    </div>


    <div class="notification">
     

<h2 class="title">
  Compound Interest Formula 
</h2>
<p>
principal ( 1 + <sup>interest </sup> / <sub> compounded </sub>) 
<sup>compounded * time </sup> =  
<sup>payment [ ( 1 + <sup>interest</sup> / <sub> compounded </sub>) <sup>compounded * time</sup> - 1 ] </sup> / <sub> <sup>interest</sup> / <sub> compounded </sub> </sub>
</p>

<p>
{{ women.equity }} ( 1 + <sup>{{ loan.interest }}</sup> / <sub> {{ loan.compoundingEvery }} </sub>) 
<sup>{{ loan.compoundingEvery }} * {{ loan.timeYears }}</sup> =  
<sup>payment [ ( 1 + <sup>{{ loan.interest }}</sup> / <sub> {{ loan.compoundingEvery }} </sub>) <sup>{{ loan.compoundingEvery }} * {{ loan.timeYears }}</sup> - 1 ] </sup> / <sub> <sup>{{ loan.interest }}</sup> / <sub> {{ loan.compoundingEvery }} </sub> </sub>
<br>
{{ loan.l }} = payment( {{ loan.r }} )
<br>

{{ loan.payment }} = payment
</p>


      </div>

  </div>
</div>
</template>


<script>
export default {
  name: "genderLens",
  props: {
    // loan: Number,
  },
  // var app = new Vue{

  // }
  // el: "#app",
  data() {
    return {
    loan: {
      principal: 300000,
      interest: 0.0299,
      compoundingEvery: 12,
      timeYears: 15,
      payment: 0,
      total: 0,
      totalInterest: 0,
      l: 0,
      r: 0,
    },
    }
  },

  methods: {
    calc : function () {
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
  // app.calc()
};

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
#app-2 {
  padding: 0 10px;
}
.columns p {
  font-weight: bold;
  line-height: 40px;
}
.columns,
#app-2 {
  margin-top: 1em;
}
.ins {
  margin-top: 2em;
}
.score {
  padding-top: 5vh;
}
</style>

