<template>
    <v-container>
        <div class="member">
            <h1>Member</h1>
            <create-event-form :organizerId="userId" />
        </div>
        <volunteer-list :eventId="selectedEvent" />
    </v-container>
</template>

<script>
import CreateEventForm from './CreateEventForm';
import VolunteerList from './VolunteerList';

export default {
    components: { CreateEventForm, VolunteerList },
    name: "member",

    data: () => ({
        title: "Member",
        selectedEvent: 1,
        userId: 3
    }),
};
</script>