<template>
    <div class="col-md-12">
        <v-container fluid>
            <v-dialog v-model="updateMessageDialog" max-width="500px">
                <v-card>
                    <v-card-title></v-card-title>
                    <v-card-text>
                        <h3>Event Updated Successfully!</h3>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="handleCloseUMD">
                            OK
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="eventDialog" max-width="888px">
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="eventDialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Edit Event</v-toolbar-title>
                </v-toolbar>
                <edit-event-form :currentevent="currentevent" @updateevent="updateEvent" />
            </v-dialog>
            <v-dialog v-model="deleteEventDialog" max-width="300px" title="Delete">
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="deleteEventDialog=false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title small>Delete</v-toolbar-title>
                </v-toolbar>
                <v-card>
                    <v-card-text>
                        <v-row class="mx-0">
                            This event record will be deleted.
                            Are you sure?
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="deleteEventDialog=false">
                            Close
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="deleteEvent(selectedEvent)">
                            Yes
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-card>
                <v-card color="orange accent-7" elevation="6" class="v-card-header d-flex grow flex-wrap pa-6">
                    My Event(s)
                    <v-spacer></v-spacer>
                    <v-text-field class="mb-5 mr-3" v-model="search" clearable hide-details append-icon="mdi-magnify" label="Search">
                    </v-text-field>
                </v-card>
                <v-data-table :headers="headers" :items="events" :search="search">
                    <template v-slot:[`item.action`]="{ item }">
                        <v-icon small class="mr-2" @click="editEvent(item.eid)"> mdi-pencil </v-icon>
                        <v-icon small @click="openDeleteEventDialog(item.eid)"> mdi-delete </v-icon>
                    </template>
                </v-data-table>
            </v-card>
        </v-container>
    </div>
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
            updateMessageDialog: false,
            deleteEventDialog: false,
            selectedEvent: 0,
            eventDialog: false,
            currentevent: {},
            headers: [
            {
                text: "Title",
                align: "start",
                sortable: false,
                value: "name",
            },
            { text: "Contact Name", value: "contactname" },
            { text: "Contact Number", value: "contactnum" },
            { text: "Total Volunteer", value: "totalvolunteer" },
            { text: "Status", value: "status" },
            { text: "Action", value: "action" }
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
                this.$emit("deleteEvent"); // this should emit the get all events in parent which is Member.vue
                this.deleteEventDialog = false;
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
            this.updateMessageDialog = true;
            
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
        },
        handleCloseUMD() {
            this.updateMessageDialog = false;
            window.location.reload();
        },
        openDeleteEventDialog(item) {
            this.deleteEventDialog = true;
            this.selectedEvent = item;
        },
    },
};
</script>