<template>
<div id="app">
<section class="hero is-info">
  <div class="hero-body">
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
      </p><p>5=Role Model
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
      <input class="input" type="number" v-on:blur="calc" v-model.number="women.equity">
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
      <label>Safe & Healthy Workplace
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