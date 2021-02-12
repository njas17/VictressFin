<template>
    <v-card class="mt-4 mx-auto mb-5" max-width="450">
        <v-sheet class="v-sheet--offset mx-auto" color="cyan" elevation="12" max-width="calc(100% - 32px)">
            <v-sparkline stroke-linecap="round" smooth :labels="Object.keys(countResult)" :value="Object.values(countResult)" color="white" line-width="2" padding="16"></v-sparkline>
        </v-sheet>

        <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">
                Volunteer Registrations
            </div>
            <div class="subheading font-weight-light grey--text">
                Current and Last Campaign Performance
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small>
                mdi-calendar
            </v-icon>
            <span class="caption grey--text font-weight-light">*last 7 days of volunteer application</span>
        </v-card-text>
    </v-card>
</template>

<script>
    import { HelperMixin } from '../mixins/HelperMixin';

    export default {
        name: 'CampaignChart',
        mixins: [HelperMixin],        
        props: {
            volunteers: Array
        },
        method: {

        },
        computed: {
            countResult() {
                let fromDate = new Date();

                //Change it so that it is 7 days in the past.
                fromDate.setDate(fromDate.getDate() - 7);

                const filterVol =  this.volunteers.filter(e => this.getLocaleDate(fromDate) < e.dateapp);
                
                let shortDate = "";
                const groupByDate = filterVol.reduce((prevAcc, curr) => {
                    shortDate = (this.getLocaleDate(curr.dateapp)).slice(5,10).replace("-", "/");
                    prevAcc[shortDate] = prevAcc[shortDate] + 1 || 1;
                    return prevAcc;
                }, {});

                return groupByDate;
            }
        }

    }
</script>

<style>
    .v-sheet--offset {
        top: -24px;
        position: relative;
    }
</style>