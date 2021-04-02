<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-alert
          color="primary"
          dark
          icon="mdi-calendar-multiple"
          border="right"
          prominent
        >
          Total Investments:
          <v-spacer />
          {{ events.length }}
        </v-alert>
      </v-col>
      <v-col>
        <v-alert color="pink" dark icon="mdi-charity" border="right" prominent>
          We're looking for:
          <v-spacer />
          {{ requiredVolunteers }} worth of funds(MYR).
        </v-alert>
      </v-col>
      <v-col>
        <v-alert
          color="orange"
          dark
          icon="mdi-account-group"
          border="right"
          prominent
        >
          We received:
          <v-spacer />
          {{ volunteer.length }} investor(s).
        </v-alert>
      </v-col>
      <v-col>
        <v-alert
          color="deep-purple darken-1"
          dark
          icon="mdi-account-check"
          border="right"
          prominent
        >
          We accepted:
          <v-spacer />
          {{ approvedVol }} fund(s)
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "DashBoard",
  props: {
    volunteer: Array,
    events: Array,
  },
  computed: {
    approvedVol() {
      let count = 0;
      for (let i = 0; i < this.volunteer.length; i++) {
        if (this.volunteer[i].status === "accepted") {
          count += 1;
        }
      }
      return count;
    },
    requiredVolunteers() {
      let sum = 0;
      for (let i = 0; i < this.events.length; i++) {
        sum += this.events[i].totalvolunteer;
      }
      return sum;
    },
  },
};
</script>
<style></style>
