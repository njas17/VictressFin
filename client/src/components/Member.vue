<template>
    <v-container>
        <div class="member">
            <h1>Member</h1>
            <member-event-list />
            <create-event-form :userId="uid" @addEvent="addNewEvent" />
        </div>
        <volunteer-list :eventId="selectedEvent" :eventName="title" />
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
                uid: 3
            }
        },
        methods: {
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
        }
    };
</script>