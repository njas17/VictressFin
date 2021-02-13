<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-card color="#FF8A80" style="padding: 20px;">
                    <v-card-title class="justify-center">
                        <v-icon medium left>mdi-calendar-multiple</v-icon>
                        Number of Event(s)
                        <v-spacer/>
                        {{events.length}}
                    </v-card-title>
                </v-card>
            </v-col>
            <v-col>
                <v-card color="cyan" style="padding: 20px;">
                    <v-card-title class="justify-center">
                        <v-icon medium left>mdi-account-group</v-icon>
                        Total Volunteers
                        <v-spacer/>
                        {{volunteer.length}}
                    </v-card-title>
                </v-card>
            </v-col>
            <v-col>
                <v-card color="#FFF59D" class="justify-center" style="padding: 20px;">
                    <v-card-title>
                        <v-icon medium left>mdi-account-check</v-icon>
                        Accepted Application
                        <v-spacer/>
                        {{ approvedVol }}
                    </v-card-title>
                </v-card>
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
            for(let i=0; i<this.volunteer.length; i++) {
                if(this.volunteer[i].status === "accepted") {
                    count += 1;
                }
            }
            return count;
        }
    },
}

</script>
<style>

</style>