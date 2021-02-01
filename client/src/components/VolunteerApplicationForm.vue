<template>
    <v-card>
        <v-card-text>
            <v-container>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field label="First name*" v-model="formValues.firstname" :counter="10" :rules="nameRules"
                                required></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="Last name*" v-model="formValues.lastname" required></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="Email*" v-model="formValues.email" required></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="Contact Number*" v-model="formValues.contactnum" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Address 1*" v-model="formValues.address1" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Address 2" v-model="formValues.address2"></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="Postcode" v-model="formValues.postcode" required></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="State" v-model="formValues.state" required></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="Country" v-model="formValues.country" required></v-text-field>
                        </v-col>
                        <!-- <v-col cols="12" sm="6">
                        <v-autocomplete
                            :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                            label="Interests" multiple></v-autocomplete>
                    </v-col> -->
                    </v-row>
                </v-form>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="handleClose">
                Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="$refs.form.reset()">
                Reset
            </v-btn>
            <v-btn color="blue darken-1" text @click="handleSubmit">
                Submit
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import { HelperMixin } from '../mixins/HelperMixin';
    export default {
        name: 'VolunteerApplicationForm',
        mixins: [HelperMixin], 
        props: {
            eventId: Number
        },
        data() {
            return {
                valid: true,
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 10) || 'Name must be less than 10 characters',
                ],
                formValues: {
                    event_id: this.eventId,
                    firstname: "",
                    lastname: "",
                    email: "",
                    contactnum: "",
                    address1: "",
                    address2: "",
                    state: "",
                    country: "",
                    postcode: "",
                    dateapp: null
                }
            }
        },

        methods: {
            handleSubmit() {
                this.$refs.form.validate();
                this.formValues.dateapp = this.getLocaleDate();
                console.log(this.formValues);
                this.$emit("volunteerApplication", this.formValues);
                this.$refs.form.reset();
            },
            handleClose() {
                this.$refs.form.reset();
                this.$emit('closeForm');
            }
        }


    }
</script>

<style>

</style>