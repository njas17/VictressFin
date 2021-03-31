<template>
  <v-app>
    <v-container fill-height fluid>
      <v-row align-self="center">
        <v-col align-self="center">
          <v-card class="mx-auto" max-width="60%" style="background-color: pink;" align="center">
            <div class="header-quiz">
              <h1>Gender Lens Score Card</h1>
            </div>
            <div style="padding: 20px;">
              <h3 style="padding: 15px;">Assess your business today using SEAF's Parameters</h3>

              <div class="step-progress" :style="{ width: progress + '%' }"></div>
              <div
                class="box"
                v-for="(question, index) in questions.slice(a, b)"
                :key="index"
                v-show="quiz"
              >
                <div class="box-question">
                  <h2>Parameter {{ b }}</h2>

                  <p>{{ question.question }}</p>
                </div>
                <div class="box-propositions">
                  <ul>
                    <li
                      v-for="(proposition, index) in question.propositions"
                      :key="index"
                      class="li"
                      @click="selectResponse(proposition, index)"
                      :class="correct ? check(proposition) : ''"
                    >
                      {{ proposition.props }}
                      <div
                        class="fas fa-check"
                        v-if="correct ? proposition.correct : ''"
                      ></div>
                      <div
                        class="fas fa-times"
                        v-if="correct ? !proposition.correct : ''"
                      ></div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="box-score" v-if="score_show">
                <v-row>
                  <v-col class="score">
                    <h2 style="padding-bottom: 15px;">Your score is <span style="color: indigo;">{{ score }}/{{ questions.length }}</span></h2>
                    <h3>80 - 100%</h3>
                    <h3 style="color: teal; padding-bottom:15px;">Role Model!</h3>
                    <h3>50 - 79%</h3>
                    <h3 style="color: rgb(106, 128, 202); padding-bottom:15px;">Nearly there, try harder. Not sure how? Contact us.</h3>
                    <h3>0 - 49%</h3>
                    <h3 style="color: salmon; padding-bottom:15px;">Talk to us. More needed to be done or watch the following video to learn more.</h3>
                  </v-col>
                  <v-col>
                    <div v-if="percentage > 79 && percentage <= 100" style="padding-top: 5px; padding-bottom: 33px;">
                      <v-progress-linear
                        v-model="percentage"
                        color="teal"
                        height="55"
                      >
                        <template v-slot:default="{ value }">
                          <strong>{{ Math.ceil(value) }}%</strong>
                        </template>
                      </v-progress-linear>
                      <h2 style="padding-top: 15px; color: teal;">Role Model</h2>
                    </div>
                    <div v-if="percentage < 80 && percentage > 49" style="padding-top: 5px; padding-bottom: 33px;">
                      <v-progress-linear
                        v-model="percentage"
                        color="rgb(106, 128, 202)"
                        height="55"
                      >
                        <template v-slot:default="{ value }">
                          <strong>{{ Math.ceil(value) }}%</strong>
                        </template>
                      </v-progress-linear>
                      <h2 style="padding-top: 15px; color: rgb(106, 128, 202);">Nearly There</h2>
                    </div>
                    <div v-else-if="percentage < 50" style="padding-top: 5px; padding-bottom: 33px;">
                      <v-progress-linear
                        v-model="percentage"
                        color="red"
                        height="55"
                      >
                        <template v-slot:default="{ value }">
                          <strong>{{ Math.ceil(value) }}%</strong>
                        </template>
                      </v-progress-linear>
                      <h2 style="padding-top: 15px; color: salmon;">Talk to Us</h2>
                    </div>
                    <div class="yt-container">
                      <iframe
                        text-align="center"
                        src="https://www.youtube.com/embed/A5QRZCc50HI"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                        class="video"
                      ></iframe>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
            <div class="footer-quiz">
              <div v-if="progress < 100" class="box-button">
                <button
                  @click="skipQuestion()"
                  :style="next ? 'background-color: rgb(106, 128, 202)' : ''"
                >
                  Skip
                </button>
                <button
                  @click="nextQuestion()"
                  :style="!next ? 'background-color: rgb(106, 128, 202)' : ''"
                >
                  Next
                </button>
              </div>
              <div v-if="score_show" class="btn-restart" style="margin-top: 5px;">
                <button @click="restartQuiz">
                  Restart <i class="fas fa-sync-alt"></i>
                </button>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// import donutChart from './components/donutChart.vue';
// import DoughnutExample from './components/DoughnutExample.vue';

export default {
  data() {
    return {
      questions: [
        //(Last Twelve Months Average Compensation for Hourly Workers (Women)

        {
          question:
            "Pay Equity. Formula: Women/men 12month compensation ratio for salaried employees (percent of women’s to men’s)",
          propositions: [
            { props: "0 to 60%" },
            { props: "61% to 85%" },
            { props: "86% to more than 95%", correct: true },
          ],
        },
        {
          question:
            "Leadership and Governance:Women’s board or/and management representation (percent of members)",
          propositions: [
            { props: "0% to 10%" },
            { props: "11% to 45%" },
            { props: "More than 45%", correct: true },
          ],
        },
        {
          question:
            "Value Chain: Do you have approach to target women customers with your products and/services",
          propositions: [
            { props: "No" },
            { props: "Somewhat" },
            { props: "Yes", correct: true },
          ],
        },
        {
          question:
            "Benefits&Professional development: Do you have policies or approach to ensure non-discrimination and equal opportunity in  performance review and promotion processes",
          propositions: [
            { props: "Nothing" },
            { props: "Somewhat" },
            { props: "Yes", correct: true },
          ],
        },
        {
          question: "Workforce Participation:Women’s turnover ratio percent of male turnover.",
          propositions: [
            { props: "More than 150%" },
            { props: "106% to 115%" },
            { props: "Less than 105%", correct: true },
          ],
        },
        {
          question:
            "Safety and health:Do you have policies to address sexual harassment and gender-based violence in the workplace ?",
          propositions: [
            { props: "Yes", correct: true },

            { props: "No" },
            { props: "Not sure" },
          ],
        },
      ],
      a: 0,
      b: 1,
      next: true,
      score_show: false,
      quiz: true,
      score: 0,
      correct: false,
      progress: 0,
      percentage: 0,
    };
  },
  name: "GenderLens",
  components: {
    //HelloWorld
  },
  computed: {},
  methods: {
    selectResponse(e) {
      this.correct = true;
      this.next = false;
      if (e.correct) {
        this.score++;
      }
      this.percentage = (this.score/6)*100
    },
    check(status) {
      if (status.correct) {
        return "correct";
      } else {
        return "incorrect";
      }
    },
    nextQuestion() {
      if (this.next) {
        return;
      }
      this.progress = this.progress + 100 / this.questions.length;
      if (this.questions.length - 1 == this.a) {
        this.score_show = true;
        this.quiz = false;
      } else {
        this.a++;
        this.b++;
        this.correct = false;
        this.next = true;
      }
    },
    skipQuestion() {
      if (!this.next) {
        return;
      }
      this.progress = this.progress + 100 / this.questions.length;
      if (this.questions.length - 1 == this.a) {
        this.score_show = true;
        this.quiz = false;
      } else {
        this.a++;
        this.b++;
      }
    },

    restartQuiz() {
      Object.assign(this.$data, this.$options.data()); // reset data in vue
    },
  },
};
</script>


<style scoped>
v-card {
  display: flex;
}

/* .container-app {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: pink;
} */

/* .container-quiz {
  display: flex;
  width: 60%;
  height: 95%;
  background-color: pink;
  text-align: center;
  flex-flow: column;
  border: 1px solid #e7eae0;
  border-radius: 10px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
} */

.header-quiz {
  display: flex;
  width: 100%;
  height: 20%;
  border-bottom: 1px solid #e7eae0;
  justify-content: center;
  align-items: center;
  background-color: #e7eae0;
  border-radius: 10px 10px 0px 0px;
}

/* .container-quiz .box {
  display: flex;
  width: 100%;
  height: 70%;
  flex-flow: column;
  margin: auto;
} */

.box-question {
  margin-top: 20px;
}

.box-question p {
  margin-top: 20px;
  padding: 15px;
}

.box-propositions {
  margin: auto;
  display: flex;
  width: 100%;
  justify-content: center;
}

ul {
  display: flex;
  width: 80%;
  margin: 0;
  padding: 0;
  flex-flow: column;
}

li {
  list-style: none;
  line-height: 2;
  border: 1px solid #cdd2d2;
  margin-bottom: 20px;
  border-radius: 15px;
  cursor: pointer;
  transition: 0.3s;
  background: white;
}

li:hover {
  /*transform: scale(1.1);*/
  background-color: #e7eae0;
}

li > div {
  float: right;
  margin-top: 7px;
  margin-right: 7px;
  color: white;
}

.check {
  color: rgb(74, 219, 74);
}

/* .close {
  color: rgb(240, 117, 100);
} */

.footer-quiz {
  display: flex;
  width: 100%;
  height: 15%;
  justify-content: center;
  border-top: 1px solid #e7eae0;
  background-color: #e7eae0;
  border-radius: 0px 0px 10px 10px;
  padding-top: 5px;
}

.box-button {
  display: flex;
  width: 100%;
}

.footer-quiz .box-button button {
  width: 150px;
  height: 35px;
  outline: none;
  border: 0;
  color: white;
  font-size: 18px;
  cursor: pointer;
  border-radius: 15px;
  margin: auto;
  margin-bottom: 10px;
  letter-spacing: 2px;
  background-color: #a09f9ff5;
}

li.correct {
  border: 1px solid rgb(74, 219, 74);
  background-color: rgb(74, 219, 74);
  color: white;
  font-weight: 600;
}

li.incorrect {
  border: 1px solid rgb(240, 117, 100);
  background-color: rgb(240, 117, 100);
  color: white;
  font-weight: 600;
}

.box-score {
  display: flex;
  width: 100%;
  height: 70%;
  flex-flow: column;
  padding: 20px;
}

/* .box-score h2 {
  margin-top: 40px;
} */

i {
  display: none;
  color: white;
}

.step-progress {
  display: flex;
  width: 100%;
  height: 5px;
  background-color: rgb(106, 128, 202);
  transition: 0.5s;
}

.btn-restart {
  display: flex;
  width: 100%;
  height: auto;
  justify-content: center;
  /* margin-top: 50px; */
}

.btn-restart button {
  width: 150px;
  height: 35px;
  outline: none;
  border: 0;
  background-color: rgb(106, 128, 202);
  color: white;
  font-size: 18px;
  cursor: pointer;
  border-radius: 15px;
  margin: auto;
  margin-bottom: 10px;
  letter-spacing: 2px;
}

.next {
  background-color: rgb(106, 128, 202);
}

/* @media screen and (max-width: 900px) {
  .container-quiz {
    width: 60%;
  }
} */

@media screen and (max-width: 720px) {
  /* .container-quiz {
    width: 80%;
  } */
  .footer-quiz .box-button button {
    width: 100px;
  }
}

.yt-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
}

.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>
