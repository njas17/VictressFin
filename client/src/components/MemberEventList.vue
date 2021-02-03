<template>
    <v-container>
        <div class="col-md-12">
            <v-container fluid>
                <v-dialog v-model="eventDialog" max-width="500px">
                    <v-toolbar dark color="primary">
                        <v-btn icon dark @click="eventDialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Edit Event</v-toolbar-title>
                    </v-toolbar>
                    <edit-event-form :currentevent="currentevent" @updateevent="updateEvent" />
                </v-dialog>
                <v-card>
                    <v-card-title>
                        My Event(s)
                        <v-spacer></v-spacer>
                        <v-text-field class="mb-5 mr-3" v-model="search" clearable hide-details append-icon="mdi-magnify" label="Search">
                        </v-text-field>
                    </v-card-title>
                    <v-data-table :headers="headers" :items="events" :search="search">
                        <template v-slot:[`item.action`]="{ item }">
                            <v-icon small class="mr-2" @click="editEvent(item.eid)"> mdi-pencil </v-icon>
                            <v-icon small @click="deleteEvent(item.eid)"> mdi-delete </v-icon>
                        </template>
                    </v-data-table>
                </v-card>
            </v-container>
        </div>
    </v-container>
</template>

<script>
import EditEventForm from './EditEventForm.vue';
export default {
    components: { EditEventForm },
    name: "MemberEventList",
    props: {
        events: Array
    },
    data () {
        return {
            eventDialog: false,
            currentevent: {},
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
            search: ""
        }
    },
    created() {
        // this.getOrgEvents(this.uid);
    },
    methods: {
        //Delete event by event_id
        deleteEvent(item) {
            console.log(item);
            fetch("/api/events/" + item, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                response.json();
                this.getOrgEvents();
            })
            .catch((error) => {
            console.error("Error in get organization events: ", error);
            });
        },
        //Open editable form
        editEvent(eid) {
            this.getEvent(eid);            
            this.eventDialog = true;
        },
        //Get event by event_id
        getEvent(eid) {
            fetch("/api/events/" + eid)
                .then(response => response.json())
                .then(data => {
                    this.currentevent = data[0];
                    //console.log(data);
                })
                .catch(error => {
                    console.error("Error in get events: ", error);
                });
        },
        updateEvent(data) {
            //console.log(data.eid, JSON.stringify(data));
            this.eventDialog = false;
            
            fetch("/api/events/" + data.eid, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }).then(res => {
                    res.json();
                    this.$emit("updateEvent"); // this should emit the get all events in parent which is Member.vue
                })
                    .catch(error => {
                        console.error("Error in updating event: ", error);
                    });                 
        }
    },
};
</script>