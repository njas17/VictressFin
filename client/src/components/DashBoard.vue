<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-alert color="primary" dark icon="mdi-calendar-multiple" border="right" prominent>
                    Total Events:
                    <v-spacer />
                    {{events.length}}
                </v-alert>
                <!-- <v-card color="#FF8A80" style="padding: 20px;">
                    <v-card-title class="justify-center">
                        <v-icon medium left>mdi-calendar-multiple</v-icon>
                        Number of Event(s)

                    </v-card-title>
                </v-card> -->
            </v-col>
            <v-col>
                <v-alert color="pink" dark icon="mdi-charity" border="right" prominent>
                    We're looking for:
                    <v-spacer />
                    {{requiredVolunteers}} volunteer(s).
                </v-alert>               
            </v-col>
            <v-col>
                <v-alert color="orange" dark icon="mdi-account-group" border="right" prominent>
                    We received:
                    <v-spacer />
                    {{volunteer.length}} volunteer application(s).
                </v-alert>
                <!-- <v-card color="cyan" style="padding: 20px;">
                    <v-card-title class="justify-center">
                        <v-icon medium left>mdi-account-group</v-icon>
                        Total Volunteers
                        <v-spacer />
                        {{volunteer.length}}
                    </v-card-title>
                </v-card> -->
            </v-col>
            <v-col>
                <v-alert color="deep-purple darken-1" dark icon="mdi-account-check" border="right" prominent>
                    We accepted:
                    <v-spacer />
                    {{ approvedVol }} volunteer(s)
                </v-alert>
                <!-- <v-card color="#FFF59D" class="justify-center" style="padding: 20px;">
                    <v-card-title>
                        <v-icon medium left>mdi-account-check</v-icon>
                        Accepted Application
                        <v-spacer />
                        {{ approvedVol }}
                    </v-card-title>
                </v-card> -->
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    export default {
        name: 'DashBoard',
        props: {
            volunteer: Array,
            events: Array
        },
        method: {

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
                return this.events.reduce((sum, curr) => sum.totalvolunteer + curr.totalvolunteer, 0) || 0;
            }
        },
    }

</script>
<style>

</style>