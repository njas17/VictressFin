<template>
    <v-container>
        <div class="member">
            <h1>Member</h1>
            <create-event-form />
            <member-event-list />
        </div>
    </v-container>
</template>

<script>
import CreateEventForm from './CreateEventForm';
import MemberEventList from "./MemberEventList";

export default {
    components: { CreateEventForm, MemberEventList },
    name: "member",

    data: () => ({
        title: "Member",
    }),
};
</script>