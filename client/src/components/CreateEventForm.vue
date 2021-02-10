<template>
    <v-container style="align-items: center; padding: 50px">
        <v-row justify="center">
            <v-col
                cols="12"
                sm="10"
                md="8"
            >
                <v-card max-width="750">
                    <v-card-title>Create Event</v-card-title>
                    <v-card-text>
                        <ValidationObserver ref="observer">
                            <ValidationProvider v-slot="{ errors }" name="Title" rules="required|max:55" autocomplete="off">
                                <v-text-field v-model="eform.name" :counter="55" :error-messages="errors" label="Title" placeholder=" " required>
                                </v-text-field><br/>
                            </ValidationProvider>
                            <v-form ref="form" lazy-validation>
                                <template>
                                    <v-row align="center">
                                        <v-col cols="12" sm="6" md="6">
                                            <v-dialog ref="dialog" v-model="smodal" :return-value.sync="eform.datefrom" persistent width="290px">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field :disabled="enabled" v-model="eform.datefrom" label="Event Start Date"
                                                        prepend-icon="event" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                </template>
                                                <v-date-picker v-model="eform.datefrom" :min="new Date().toISOString().substr(0, 10)" scrollable>
                                                    <v-btn text color="info" @click="smodal = false">Cancel</v-btn>
                                                    <v-btn text color="info" @click="$refs.dialog.save(eform.datefrom)">OK</v-btn>
                                                </v-date-picker>
                                            </v-dialog>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-dialog ref="dialog2" v-model="emodal" :return-value.sync="eform.dateto" persistent width="290px">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field :disabled="enabled" v-model="eform.dateto" label="Event End Date"
                                                        prepend-icon="event" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                </template>
                                                <v-date-picker v-model="eform.dateto" :min="new Date().toISOString().substr(0, 10)" scrollable>
                                                    <v-spacer></v-spacer>
                                                    <v-btn text color="info" @click="emodal = false">Cancel</v-btn>
                                                    <v-btn text color="info" @click="$refs.dialog2.save(eform.dateto)">OK</v-btn>
                                                </v-date-picker>
                                            </v-dialog>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-dialog ref="dialog3" v-model="cmodal" :return-value.sync="eform.closingdate" persistent width="290px">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field :disabled="enabled" v-model="eform.closingdate" label="Application Closing Date"
                                                        prepend-icon="event" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                </template>
                                                <v-date-picker v-model="eform.closingdate" :min="new Date().toISOString().substr(0, 10)" scrollable>
                                                    <v-spacer></v-spacer>
                                                    <v-btn text color="info" @click="cmodal = false">Cancel</v-btn>
                                                    <v-btn text color="info" @click="$refs.dialog3.save(eform.closingdate)">OK</v-btn>
                                                </v-date-picker>
                                            </v-dialog>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-checkbox v-model="enabled" label="Ongoing event"></v-checkbox><br/>
                                        </v-col>
                                    </v-row>
                                </template>
                            </v-form>
                            <ValidationProvider v-slot="{ errors }" name="Description" rules="required|max:500" autocomplete="off">
                                <v-textarea v-model="eform.description" :counter="500" :error-messages="errors" label="Description"
                                    placeholder=" " auto-grow rows="1" required></v-textarea>
                            </ValidationProvider>
                            <ValidationProvider v-slot="{ errors }" name="Location" rules="required" autocomplete="off">
                                <v-text-field v-model="eform.location" :error-messages="errors" label="Location" placeholder=" " required>
                                </v-text-field>
                            </ValidationProvider>
                            <ValidationProvider v-slot="{ errors }" name="Contact Person" rules="required" autocomplete="off">
                                <v-text-field v-model="eform.contactname" :error-messages="errors" label="Contact Person" placeholder=" "
                                    required></v-text-field>
                            </ValidationProvider>
                            <ValidationProvider v-slot="{ errors }" name="Phone" :rules="{ required: true, regex: /^[\d-\s]{9,}$/ }"
                                autocomplete="off">
                                <vue-tel-input-vuetify v-model="eform.contactnum" :error-messages="errors"
                                    :preferred-countries="['my', 'in', 'es', 'gb', 'us']" :maxLen="11" required />
                            </ValidationProvider>
                            <ValidationProvider v-slot="{ errors }" name="Email" rules="email" autocomplete="off">
                                <v-text-field v-model="eform.contactemail" :error-messages="errors" label="Email (optional)" placeholder=" ">
                                </v-text-field>
                            </ValidationProvider>
                            <ValidationProvider v-slot="{ errors }" name="Total Volunteers Needed" rules="required" autocomplete="off">
                                <v-text-field type="number" v-model="eform.totalvolunteer" :error-messages="errors"
                                    label="Total Volunteers Needed" placeholder=" " required></v-text-field><br/>
                            </ValidationProvider>
                            <ValidationProvider>
                                <template>
                                    <v-text-field v-model="eform.images" placeholder=" "
                                        prepend-icon="mdi-camera" show-size label="Image URL (http//:)"></v-text-field><br/>
                                    <!-- <v-file-input v-model="eform.images" accept="image/png, image/jpeg" placeholder=" "
                                        prepend-icon="mdi-camera" show-size label="Image Upload"></v-file-input> -->
                                </template>
                                <v-spacer></v-spacer>
                            </ValidationProvider>
                            <v-spacer></v-spacer>
                            <ValidationProvider v-slot="{ errors }" rules="required" name="Checkbox">
                                <v-checkbox
                                    :error-messages="errors"
                                    :rules="[rules.required]"
                                    color="blue"
                                    >
                                    <template v-slot:label>
                                        <div @click.stop="">
                                        Do you accept the
                                        <a
                                            href="#"
                                            @click.prevent="terms = true"
                                        >terms</a>
                                        and
                                        <a
                                            href="#"
                                            @click.prevent="conditions = true"
                                        >conditions</a>?
                                        </div>
                                    </template>
                                </v-checkbox>
                            </ValidationProvider>
                            <v-spacer></v-spacer>
                            <v-col class="text-right">
                                <v-btn class="mr-4" @click="submit">Submit</v-btn>
                                <v-btn @click="clear">Reset</v-btn>
                            </v-col>
                        </ValidationObserver>
                    </v-card-text>    
                </v-card>
            </v-col>    
        </v-row>
    </v-container>
</template>
<script>
    import { required, email, max, regex } from 'vee-validate/dist/rules';
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate';
    // import * as filestack from 'filestack-js';
    // const client = filestack.init('AR5GxmAoWQEKSNfRrAlfTz');

    setInteractionMode('eager');

    extend('required', {
        ...required,
        message: '{_field_} can not be empty',
    });

    extend('max', {
        ...max,
        message: '{_field_} may not be greater than {length} characters',
    });

    extend('email', {
        ...email,
        message: 'Email must be valid',
    });

    extend('regex', {
        ...regex,
        message: 'Phone number must be valid',
    });

    export default {
        name: "CreateEventForm",
        components: { ValidationProvider, ValidationObserver },
        props: {
            userId: Number
        },
        data() {
            return {
                eform: {
                    organizer_id: this.userId,
                    name: "",
                    datefrom: null,                    
                    dateto: null,
                    closingdate: null,
                    status: "active",
                    description: "",
                    contactname: "",
                    contactnum: "",
                    contactemail: "",
                    totalvolunteer: null,
                    location: "",
                    images: "https://images.unsplash.com/photo-1596817120625-7695129a2c92?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
                },
                smodal: false,
                emodal: false,
                cmodal: false,
                checkbox: null,
                rules: '',
                requiredRules: '',
                enabled: false,
            }
        },

        methods: {
            submit() {
                this.$refs.observer.validate();
                this.$refs.form.validate();
                this.$emit("addEvent", this.eform);
            },
            clear() {
                this.eform.name = '';
                this.eform.datefrom = null;                    
                this.eform.dateto = null;
                this.eform.closingdate = null;
                this.eform.status = "active";
                this.eform.description = "";
                this.eform.contactname = "";
                this.eform.contactnum = "";
                this.eform.contactemail = "";
                this.eform.totalvolunteer = null;
                this.eform.location = "";              
                this.checkbox = null;
                this.$refs.observer.reset();
                this.$refs.form.reset();
            },
        },
    };
</script>