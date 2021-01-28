<template>
    <v-container>
        <div class="member">
            <h1>Member</h1>
            <create-event-form />
        </div>
    </v-container>
</template>

<script>
import CreateEventForm from './CreateEventForm';

export default {
    components: { CreateEventForm },
    name: "member",

    data: () => ({
        title: "Member",
    }),
};
</script>