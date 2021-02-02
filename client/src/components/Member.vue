<template>
    <v-container>
        <div class="member">
            <h1>Member</h1>
            <member-event-list />
        </div>
    </v-container>
</template>

<script>
import MemberEventList from "./MemberEventList";

export default {
    components: { MemberEventList },
    name: "member",

    data: () => ({
        title: "Member",
    }),
};
</script>