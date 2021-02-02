<template>
    <v-card>
        <v-card-title>
            My Event(s)
            <v-spacer></v-spacer>
            <v-text-field class="mb-5 mr-3" v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
            </v-text-field>
            <v-btn color="primary" dark class="mb-2 ml-3">
                ADD EVENT
            </v-btn>
        </v-card-title>
        <v-data-table :headers="headers" :items="orgevents" :search="search">
            <template v-slot:[`item.action`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
export default {
    name: "MemberEventList",
    data: () => ({
        orgevents: [],
        headers: [
        {
            text: "Title",
            align: "start",
            sortable: false,
            value: "name",
        },
        { text: "Status", value: "status" },
        { text: "Total Volunteer", value: "totalvolunteer" },
        { text: "", value: "action" }
        ],
        search: "",
    }),
    created() {
        this.getOrgEvents(2);
    },
    methods: {
        //Get events by organization
        getOrgEvents(organizer_id) {
        // organizer_id = "2"
        fetch("/api/events/organizer/" + organizer_id)
            .then((response) => response.json())
            .then((data) => {
            this.orgevents = data;
            })
            .catch((error) => {
            console.error("Error in get organization events: ", error);
            });
        },
    },
};
</script>