<template>
    <v-container>
        <div class="member">
            <h1>Member</h1>
            <create-event-form :userId="uid" @addEvent="addNewEvent" />
            <member-event-list :events="orgevents" @updateEvent="handleUpdate" />
            <volunteer-list :eventId="selectedEvent" :eventName="title" />
        </div>
    </v-container>
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
                title: "Member",
                selectedEvent: 1,
                uid: 3,
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
                fetch("/api/events", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => {
                        response.json();
                        //this should call method which will update the event list
                    })
                    .catch(error => {
                        console.error("Error in add event: ", error);
                    });
            },
            handleUpdate() {
                this.getOrgEvents();
            }
        }
    };
</script>