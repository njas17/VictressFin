<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-card color="#FF8A80" style="padding: 20px;">
                    <v-card-title class="justify-center">
                        <v-icon medium left>mdi-calendar-multiple</v-icon>
                        <!-- <v-spacer/> -->
                        Number of Event(s)
                        <v-spacer/>
                        2
                    </v-card-title>
                </v-card>
            </v-col>
            <v-col>
                <v-card color="cyan" style="padding: 20px;">
                    <v-card-title class="justify-center">
                        <v-icon medium left>mdi-account-group</v-icon>
                        Total Volunteers
                        <v-spacer/>
                        4
                    </v-card-title>
                </v-card>
            </v-col>
            <v-col>
                <v-card color="#FFF59D" class="justify-center" style="padding: 20px;">
                    <v-card-title>
                        <v-icon medium left>mdi-account-check</v-icon>
                        Accepted Application
                        <v-spacer/>
                        1
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
        volunteers: Array,
        orgevents: Array
    },
    method: {

    },
}

</script>
<style>

</style>