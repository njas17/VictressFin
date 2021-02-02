<template>
    <ValidationObserver ref="observer">
        <v-form ref="form" lazy-validation>
            <h2>Create Event</h2>
            <ValidationProvider v-slot="{ errors }" name="Title" rules="required|max:25" autocomplete="off">
                <v-text-field v-model="form.name" :counter="55" :error-messages="errors" label="Title" placeholder=" "
                    required></v-text-field>
            </ValidationProvider>
            <template>
                <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-dialog ref="dialog" v-model="smodal" :return-value.sync="form.datefrom" persistent width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="form.datefrom" label="Start Date" prepend-icon="event" readonly
                                    v-bind="attrs" v-on="on" :rules='requiredRules' required></v-text-field>
                            </template>
                            <v-date-picker v-model="form.datefrom" :min="new Date().toISOString().substr(0, 10)" scrollable>
                                <v-btn text color="info" @click="smodal = false">Cancel</v-btn>
                                <v-btn text color="info" @click="$refs.dialog.save(form.datefrom)">OK</v-btn>
                            </v-date-picker>
                        </v-dialog>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="12" sm="6" md="6">
                        <v-dialog ref="dialog2" v-model="emodal" :return-value.sync="form.dateto" persistent width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="form.dateto" label="End Date" prepend-icon="event" readonly
                                    v-bind="attrs" v-on="on" :rules='requiredRules' required></v-text-field>
                            </template>
                            <v-date-picker v-model="form.dateto" :min="new Date().toISOString().substr(0, 10)" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="info" @click="emodal = false">Cancel</v-btn>
                                <v-btn text color="info" @click="$refs.dialog2.save(form.dateto)">OK</v-btn>
                            </v-date-picker>
                        </v-dialog>
                    </v-col>
                </v-row>
            </template>
            <ValidationProvider v-slot="{ errors }" name="Description" rules="required|max:400" autocomplete="off">
                <v-textarea v-model="form.description" :counter="400" :error-messages="errors" label="Description"
                    placeholder=" " auto-grow rows="1" required></v-textarea>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Contact" rules="required|55" autocomplete="off">
                <v-text-field v-model="form.contactname" :counter="55" :error-messages="errors" label="Contact Person"
                    placeholder=" " required></v-text-field>
            </ValidationProvider>
            <template>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <vue-tel-input-vuetify v-model="phone" type="text"
                                :preferred-countries="['my', 'in', 'es', 'gb', 'us']" :valid-characters-only="true"
                                @input="onInput" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <div v-if="phone.number" style="color: #e83e8c">
                                <span>
                                    Number:
                                    <strong>{{ phone.number }}</strong>,&nbsp;
                                </span>
                                <span>
                                    Is valid:
                                    <strong>{{ phone.valid }}</strong>,&nbsp;
                                </span>
                                <span>
                                    Country:
                                    <strong>{{ phone.country }}</strong>
                                </span>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </template>
            <ValidationProvider>
                <v-text-field v-model="form.contactemail" :error-messages="errors" label="E-mail (optional)" placeholder=" ">
                </v-text-field>
            </ValidationProvider>
            <template>
                <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-dialog ref="dialog3" v-model="cmodal" :return-value.sync="form.closingdate" persistent width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="form.closingdate" label="Closing Date (Volunteer Application)" prepend-icon="event" readonly
                                    v-bind="attrs" v-on="on" :rules='requiredRules' required></v-text-field>
                            </template>
                            <v-date-picker v-model="form.closingdate" :min="new Date().toISOString().substr(0, 10)" scrollable>
                                <v-btn text color="info" @click="cmodal = false">Cancel</v-btn>
                                <v-btn text color="info" @click="$refs.dialog.save(form.closingdate)">OK</v-btn>
                            </v-date-picker>
                        </v-dialog>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="12" sm="6" md="6">

                    </v-col>
                </v-row>
            </template>

            <ValidationProvider v-slot="{ errors }" name="totalvolunteersneeded" rules="required" autocomplete="off">
                <v-text-field v-model="form.totalvolunteer" :error-messages="errors" label="Total Volunteers Needed"
                    placeholder=" " required></v-text-field>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" rules="required" name="checkbox">
                <v-checkbox v-model="checkbox" :error-messages="errors" value="1" label="Option" type="checkbox"
                    required></v-checkbox>
            </ValidationProvider>

            <v-btn class="mr-4" @click="submit">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
        </v-form>
    </ValidationObserver>
</template>

<script>
    import { required, email, max } from 'vee-validate/dist/rules'
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

    setInteractionMode('eager')

    extend('required', {
        ...required,
        message: '{_field_} can not be empty',
    })

    extend('max', {
        ...max,
        message: '{_field_} may not be greater than {length} characters',
    })

    extend('email', {
        ...email,
        message: 'Email must be valid',
    })

    export default {
        components: {  ValidationProvider, ValidationObserver },        
        name: "CreateEventForm",
        props: {
            organizerId: Number
        },
        data() {
            return {
                form: {
                    organizer_id: this.organizerId,
                    name: "",
                    dateto: null,
                    datefrom: null,
                    closingdate: null,
                    status: "active",
                    description: "",
                    contactname: "",
                    contactnum: "",
                    contactemail: "",
                    totalvolunteer: 0,
                    location: ""
                },
                errors: '',
                name: '',
                email: '',
                select: null,
                items: [],
                checkbox: null,
                edate: null,
                sdate: null,
                smodal: false,
                emodal: false,
                cmodel: false,
                description: '',
                contactperson: '',
                totalvolunteersneeded: '',
                requiredRules: [v => !!v || "Date is required"],
                phone: {
                    number: null,
                    valid: false,
                    country: 'my'
                }
            }
        },

        methods: {
            submit() {
                this.$refs.observer.validate()
                this.$refs.form.validate()
            },
            clear() {
                this.$refs.observer.reset()
                this.$refs.form.reset()
            },
            onInput(formattedNumber, { number, valid, country }) {
                this.phone.number = number.international;
                this.phone.valid = valid;
                this.phone.country = country && country.name;
            }
        },
        created() {

        }
    };
</script>