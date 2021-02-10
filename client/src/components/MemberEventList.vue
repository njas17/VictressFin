<template>
    <div class="col-md-12">
        <v-container fluid>
            <v-dialog v-model="updateMessageDialog" max-width="500px">
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="updateMessageDialog=false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title small>Update</v-toolbar-title>
                </v-toolbar>
                <v-card>
                    <v-card-text>
                        <v-row class="mx-0" style="padding-top: 20px;">
                            <h3>Event successfully updated!</h3>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="updateMessageDialog=false">
                            OK
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="eventDialog" max-width="700px">
                <v-card>
                    <v-system-bar dark color="#80DEEA">
                        <!-- <v-btn icon dark @click="eventDialog = false"> -->
                            <v-icon @click="eventDialog = false">mdi-close</v-icon>
                        <!-- </v-btn> -->
                        <!-- <v-toolbar-title>Edit Event</v-toolbar-title> -->
                    </v-system-bar>
                    <!-- <v-card-title> -->
                        <!-- <v-toolbar-title>
                            Update Event
                        </v-toolbar-title> -->
                    <!-- </v-card-title> -->
                    <v-container>
                        <edit-event-form :currentevent="currentevent" @updateevent="updateEvent" @closeEditForm="eventDialog=false" />
                    </v-container>    
                </v-card>
            </v-dialog>
            <v-dialog v-model="deleteEventDialog" max-width="500px" title="Delete">
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="deleteEventDialog=false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title small>Delete</v-toolbar-title>
                </v-toolbar>
                <v-card>
                    <v-card-text>
                        <v-row class="mx-0" style="padding-top: 20px;">
                            <h3>This event record will be deleted. Are you sure?</h3>
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
                <v-card color="grey lighten-1" elevation="6" class="v-card-header d-flex grow flex-wrap pa-6">
                    My Event(s)
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" clearable hide-details append-icon="mdi-magnify" label="Search">
                    </v-text-field>
                </v-card>
                <v-data-table :headers="headers" :items="events" :search="search" height="250px" :single-expand="singleExpand" :expanded.sync="expanded" item-key="name" show-expand>
                    <template v-slot:[`item.status`]="{ item }">
                        <v-chip :color="getColor(item.status)" dark class="text-capitalize" x-small>
                            {{ item.status }}
                        </v-chip>
                    </template>
                    <template v-slot:[`item.action`]="{ item }">
                        <v-icon color="cyan darken-3" small class="mr-2" @click="editEvent(item.eid)"> mdi-pencil </v-icon>
                        <v-icon color="cyan darken-3" small @click="openDeleteEventDialog(item.eid)"> mdi-delete </v-icon>
                    </template>
                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                            <h3>Description</h3>
                            <p>{{ item.description }}</p><br/>
                            <h3>Start Date | End Date | Closing Date</h3>
                            <p>{{ getLocaleDate(item.datefrom) }}<strong> | </strong>{{ getLocaleDate(item.dateto) }}<strong> | </strong>{{ getLocaleDate(item.closingdate) }}</p><br/>
                            <h3>Location</h3>
                            <p>{{ item.location }}</p><br/>
                            <h3>Contact Email</h3>
                            <p>{{ item.contactemail }}</p><br/>
                        </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import EditEventForm from './EditEventForm.vue';
import { HelperMixin } from '../mixins/HelperMixin';

export default {
    components: { EditEventForm },
    mixins: [HelperMixin],
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
            expanded: [],
            singleExpand: true,
            headers: [
            {
                text: "Title",
                align: "start",
                sortable: true,
                value: "name",
                // width: "200px"
            },
            { text: "Contact Name", value: "contactname" },
            { text: "Contact Number", value: "contactnum" },
            { text: "Total Volunteer", value: "totalvolunteer", align: "center" },
            { text: "Status", value: "status", align: "center" },
            { text: "Action", value: "action", align: "center", sortable: "false" },
            { text: '', value: 'data-table-expand' }
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
        openDeleteEventDialog(item) {
            this.deleteEventDialog = true;
            this.selectedEvent = item;
        },
        getColor(status) {
            //class="text-capitalize
            if (status === 'active') return 'green'
            else return 'red'
        }
    }
};
</script>