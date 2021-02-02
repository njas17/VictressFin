<template>
    <v-card>
        <v-card-title>
            Volunteer List
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
            </v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="volunteers" :search="search"></v-data-table>
        
    </v-card>
</template>

<script>
    export default {
        name: 'VolunteerList',
        props: {
            eventId: Number
        },
        data() {
            return {
                event_id: 1, //this.eventId,
                volunteers: [],
                search: '',
                headers: [
                    {
                        text: 'First Name',
                        align: 'start',
                        sortable: false,
                        value: 'firstname',
                    },
                    { text: 'Last Name', value: 'lastname' },
                    { text: 'Contact Number', value: 'contactnum' },
                    { text: 'State', value: 'state' },
                    { text: 'Country', value: 'country' },
                    { text: 'Date Apply', value: 'dateapp' },
                    { text: 'Status', value: 'status' },
                    { text: 'Action' }
                ]
            }
        },
        methods: {
            getAllVolunteers() {
                fetch("/api/volunteers/" + this.event_id)
                    .then(response => response.json())
                    .then(data => this.volunteers = data);
            }
        },
        created() {
            this.getAllVolunteers();
        }

    }

</script>

<style>

</style>