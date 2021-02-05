<template>
    <v-app app>
        <v-app-bar
        absolute
        color="#6A76AB"
        dark
        shrink-on-scroll
        prominent
        src="https://picsum.photos/1920/1080?random"
        fade-img-on-scroll
        >
            <template v-slot:img="{ props }">
                <v-img
                v-bind="props"
                gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
                ></v-img>
            </template>

            <v-toolbar-title>Member Dashboard</v-toolbar-title>

            <v-spacer></v-spacer>

            <template v-slot:extension>
                <v-tabs
                    v-model="tab"
                    centered
                    dark
                    icons-and-text
                    >
                    <v-tabs-slider></v-tabs-slider>

                    <v-tab>
                        My Event(s)
                        <v-icon>mdi-calendar-heart</v-icon>
                    </v-tab>
                    <v-tab-item>
                        <member-event-list :events="orgevents" @updateEvent="handleUpdate" @deleteEvent="handleDelete" />
                        <volunteer-list :eventId="selectedEvent" :eventName="title" />
                    </v-tab-item>

                    <v-tab>
                        Create Event
                        <v-icon>mdi-calendar-plus</v-icon>
                    </v-tab>
                    <v-tab-item>
                        <create-event-form :userId="uid" @addEvent="addNewEvent" />
                    </v-tab-item>
                </v-tabs>
            </template>
        </v-app-bar>
    </v-app>
</template>



<script>
    import MemberEventList from "./MemberEventList";
    import VolunteerList from './VolunteerList';
    import CreateEventForm from './CreateEventForm';

    export default {
        components: { CreateEventForm, VolunteerList, MemberEventList },
        name: "member",
            props: {
            userId: Number
        },
        data() {
            return {
                // createEventDialog: false,
                tab: null,
                title: "Member",
                selectedEvent: 1,
                uid: 2,
                orgevents: []
            }
        },
        created() {
            this.getOrgEvents();
        },
        methods: {
            //Get events by organization
            getOrgEvents() {
                // organizer_id = "2"
                fetch("/api/events/organizer/" + this.uid)
                    .then(response => response.json())
                    .then(data => this.orgevents = data)
                    .catch(error => {
                        console.error("Error in get organization events: ", error);
                    });
            },
            addNewEvent(data) {
                //console.log(JSON.stringify(data));
                this.createEventDialog = false;

                fetch("/api/events", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => {
                        response.json();
                        this.getOrgEvents(); //this should call method which will update the event list

                    })
                    .catch(error => {
                        console.error("Error in add event: ", error);
                    });
            },
            handleUpdate() {
                this.getOrgEvents();
            },
            handleDelete() {
                this.getOrgEvents();
            },
            // openCreateEventDialog() {
            // this.createEventDialog = true;
            // },
        }
    };
</script>


    // <v-app>
    //     <v-container>
    //         <div class="member">
    //             <h1>Member</h1>
                <!-- <template>
                    <v-expansion-panels focusable>
                        <v-expansion-panel>
                            <v-expansion-panel-header disable-icon-rotate>
                                <v-card-title>
                                    Create Event
                                </v-card-title>
                                <template v-slot:actions>
                                    <v-icon color="primary">mdi-plus</v-icon>
                                </template>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <create-event-form :userId="uid" @addEvent="addNewEvent" />
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </template> -->
    //             <v-spacer></v-spacer>
    //             <v-btn
    //                 color="error"
    //                 dark
    //                 large
    //                 @click="openCreateEventDialog"
    //                 >
    //                 Create Event
    //                 <v-icon color="primary">mdi-plus</v-icon>
    //             </v-btn>
    //             <v-dialog v-model="createEventDialog" max-width="888px">
    //                 <v-toolbar dark color="primary">
    //                     <v-btn icon dark @click="createEventDialog = false">
    //                         <v-icon>mdi-close</v-icon>
    //                     </v-btn>
    //                     <v-toolbar-title>Create Event</v-toolbar-title>
    //                 </v-toolbar>
    //                 <create-event-form :userId="uid" @addEvent="addNewEvent" />
    //             </v-dialog>
    //             <member-event-list :events="orgevents" @updateEvent="handleUpdate" @deleteEvent="handleDelete"/>
    //             <volunteer-list :eventId="selectedEvent" :eventName="title" />
    //         </div>
    //     </v-container>
    // </v-app>
