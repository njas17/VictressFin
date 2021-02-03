<template>
    <v-card>
        <v-card-text>
            <div class="edit-form py-3">
                <v-form ref="form" lazy-validation>
                    <v-text-field v-model="currentevent.name" :rules="[(v) => !!v || 'Title is required']" label="Title"
                        required></v-text-field>

                    <v-text-field v-model="currentevent.description" :rules="[(v) => !!v || 'Description is required']"
                        label="Description" required></v-text-field>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="handleUpdate"> Update </v-btn>
                    </v-card-actions>
                </v-form>

                <p class="mt-3">{{ message }}</p>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "EditEventForm",
        props: {
            currentevent: Object
        },
        data() {
            return {
                message: "",
                eventform: {
                    name: "",
                    description: "",
                    eid: 0
                }
            };
        },
        created() {

        },
        methods: {
            handleUpdate() {
                this.eventform.name = this.currentevent.name;
                this.eventform.description = this.currentevent.description;
                this.eventform.eid = this.currentevent.eid;

                this.$emit("updateevent", this.eventform);
            },
        }
    }
</script>