<template>
    <v-container>
        <div class="member">
            <h1>Member</h1>
            <twitter-highlights /><br/>
            <create-event-form />
        </div>
    </v-container>
</template>

<script>
import CreateEventForm from './CreateEventForm';
import TwitterHighlights from './TwitterHighlights.vue';

export default {
    components: { CreateEventForm, TwitterHighlights },
    name: "member",

    data: () => ({
        title: "Member",
    }),
};
</script>