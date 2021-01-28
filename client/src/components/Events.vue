<template>
    <v-container>
        <div class="events">
            <h1>Events</h1>
        </div>
        <div class="col-md-6">
        <h4>Events List</h4>
        <ul class="list-group">
            <li class="list-group-item list-group-item-action" v-for="(event, id) in events" :key="id">
                {{ event.id }}
                {{ event.name }} 
                {{ event.closingdate }}
                {{ event.status }}
                {{ event.description }}
                {{ event.totalvolunteer }}
                {{ event.organization_name }}
            </li>
            </ul>
        </div> 
    </v-container>
</template>

<script>
export default {
    name: "events",

    data: () => ({
        events: [],
    }),

    created() {
        this.getEvents()
    },

    methods: {
        //Get all events
        getEvents() {
            fetch("/api/events")
            .then(response => response.json())
            .then(data => {
                this.events = data;
            })
            .catch(error => {
                console.error("Error in get events: ", error);
            });
        }
    }
};
</script>