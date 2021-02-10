<template>
    <div id="app">
        <v-app>
            <v-card>
                <v-spacer></v-spacer>
                <v-app-bar absolute color="#6A76AB" dark shrink-on-scroll prominent
                    src="https://images.unsplash.com/photo-1499244571948-7ccddb3583f1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8Y2hhbmdlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    fade-img-on-scroll scroll-target="#scrolling-techniques-5">
                    <template v-slot:img="{ props }">
                        <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
                    </template>

                    <v-toolbar-title>Member Dashboard</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <template v-slot:extension>
                        <v-tabs v-model="tab" centered dark icons-and-text>
                            <v-tabs-slider></v-tabs-slider>

                            <v-tab>
                                My Event(s)
                                <v-icon>mdi-calendar-heart</v-icon>
                            </v-tab>
                            <v-tab-item>
                                <v-container style="align-items: center; padding-top: 30px">
                                    <v-row>
                                        <v-col>
                                            <v-flex style="padding-bottom: 30px;">
                                                <member-event-list :events="orgevents" @updateEvent="handleUpdate"
                                                    @deleteEvent="handleDelete" />
                                            </v-flex>
                                            <v-flex style="padding-bottom: 30px;">
                                                <volunteer-list :eventId="selectedEvent" :eventName="title" />
                                            </v-flex>
                                        </v-col>
                                        <v-col>
                                            <v-flex style="padding-left: 80px">
                                                <campaign-chart />
                                            </v-flex>
                                            <v-flex style="padding-left: 80px">
                                                <a class="twitter-timeline" data-width="450" data-height="898"
                                                    data-theme="light"
                                                    href="https://twitter.com/sejiwaMalaysia/lists/malaysian-community-49131?ref_src=twsrc%5Etfw">A
                                                    Twitter List by sejiwaMalaysia</a>
                                            </v-flex>
                                        </v-col>
                                    </v-row>
                                </v-container>
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
                <v-sheet id="scrolling-techniques-5" class="overflow-y-auto" max-height="1200">
                    <v-container style="height: 1200px;"></v-container>
                </v-sheet>
            </v-card>
        </v-app>
    </div>
</template>



<script>
    import MemberEventList from "./MemberEventList";
    import VolunteerList from './VolunteerList';
    import CreateEventForm from './CreateEventForm';
    import CampaignChart from './CampaignChart';
    import store from './../store';

    export default {
        components: { CreateEventForm, VolunteerList, MemberEventList, CampaignChart },
        name: "member",
        // props: {
        //     userId: Number
        // },
        data() {
            return {
                tab: null,
                title: "Member",
                selectedEvent: 1,
                uid: store.state.user.uid,
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
            }
        }
    };
</script>