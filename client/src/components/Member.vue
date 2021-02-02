<template>
    <v-container>
        <div class="member">
            <h1>Member</h1>
            <member-event-list />
            <create-event-form :organizerId="userId" />
        </div>
        <volunteer-list :eventId="selectedEvent" />
    </v-container>
</template>

<script>
import CreateEventForm from './CreateEventForm';
import MemberEventList from "./MemberEventList";
import VolunteerList from './VolunteerList';

export default {
    components: { CreateEventForm, VolunteerList, MemberEventList },
    name: "member",

    data: () => ({
        title: "Member",
        selectedEvent: 1,
        userId: 3
    }),
};
</script>