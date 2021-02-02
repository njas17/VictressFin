<template>
    <ValidationObserver ref="observer">

        <h2>Create Event</h2>
        <ValidationProvider v-slot="{ errors }" name="Organization Id" rules="required">
            <v-select v-model="organizationid" :items="items" :error-messages="errors" label="Organization Id"
                data-vv-name="organizationid" required></v-select>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" name="Title" rules="required|max:55" autocomplete="off">
            <v-text-field v-model="name" :counter="55" :error-messages="errors" label="Title" placeholder=" " required>
            </v-text-field>
        </ValidationProvider>
        <v-form ref="form" lazy-validation>
            <template>
                <v-row align="center">
                    <v-col cols="12" sm="3" md="3">
                        <v-dialog ref="dialog" v-model="smodal" :return-value.sync="sdate" persistent width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field :disabled="enabled" v-model="sdate" label="Event Start Date"
                                    prepend-icon="event" readonly v-bind="attrs" v-on="on"></v-text-field>
                                <!-- :rules='[v => !!v || "Date is required"]' -->
                            </template>
                            <v-date-picker v-model="sdate" :min="new Date().toISOString().substr(0, 10)" scrollable>
                                <v-btn text color="info" @click="smodal = false">Cancel</v-btn>
                                <v-btn text color="info" @click="$refs.dialog.save(sdate)">OK</v-btn>
                            </v-date-picker>
                        </v-dialog>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="12" sm="3" md="3">
                        <v-dialog ref="dialog2" v-model="emodal" :return-value.sync="edate" persistent width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field :disabled="enabled" v-model="edate" label="Event End Date"
                                    prepend-icon="event" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="edate" :min="new Date().toISOString().substr(0, 10)" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="info" @click="emodal = false">Cancel</v-btn>
                                <v-btn text color="info" @click="$refs.dialog2.save(edate)">OK</v-btn>
                            </v-date-picker>
                        </v-dialog>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="12" sm="3" md="3">
                        <v-dialog ref="dialog3" v-model="cmodal" :return-value.sync="cdate" persistent width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field :disabled="enabled" v-model="cdate" label="Application Closing Date"
                                    prepend-icon="event" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="cdate" :min="new Date().toISOString().substr(0, 10)" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="info" @click="cmodal = false">Cancel</v-btn>
                                <v-btn text color="info" @click="$refs.dialog3.save(cdate)">OK</v-btn>
                            </v-date-picker>
                        </v-dialog>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="12" sm="2" md="2">
                        <v-checkbox v-model="enabled" label="Ongoing event"></v-checkbox>
                    </v-col>
                </v-row>
            </template>
        </v-form>
        <ValidationProvider v-slot="{ errors }" name="Description" rules="required|max:255" autocomplete="off">
            <v-textarea v-model="description" :counter="255" :error-messages="errors" label="Description"
                placeholder=" " auto-grow rows="1" required></v-textarea>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" name="Location" rules="required" autocomplete="off">
            <v-text-field v-model="location" :error-messages="errors" label="Location" placeholder=" " required>
            </v-text-field>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" name="Contact Person" rules="required" autocomplete="off">
            <v-text-field v-model="contactperson" :error-messages="errors" label="Contact Person" placeholder=" "
                required></v-text-field>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" name="Phone" :rules="{ required: true, regex: /^[\d-\s]+$/ }"
            autocomplete="off">
            <vue-tel-input-vuetify v-model="phone" :error-messages="errors"
                :preferred-countries="['my', 'in', 'es', 'gb', 'us']" :maxLen="11" required />
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" name="Email" rules="email" autocomplete="off">
            <v-text-field v-model="email" :error-messages="errors" label="Email (optional)" placeholder=" ">
            </v-text-field>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" name="Total Volunteers Needed" rules="required" autocomplete="off">
            <v-text-field type="number" v-model="totalvolunteersneeded" :error-messages="errors"
                label="Total Volunteers Needed" placeholder=" " required></v-text-field>
        </ValidationProvider>
        <ValidationProvider>
            <template>
                <v-file-input v-model="imageupload" accept="image/png, image/jpeg" placeholder=" "
                    prepend-icon="mdi-camera" show-size label="Image Upload"></v-file-input>
            </template>
        </ValidationProvider>
        <!-- <ValidationProvider v-slot="{ errors }" rules="required" name="Checkbox">
            <v-checkbox
                v-model="agreement"
                :error-messages="errors"
                :rules="[rules.required]"
                color="deep-purple"
            >
                <template v-slot:label>
                I agree to the &nbsp;
                <a
                    href="#"
                    @click.stop.prevent="dialog = true"
                >Terms of Service</a> 
                &nbsp; and &nbsp;
                <a
                    href="#"
                    @click.stop.prevent="dialog = true"
                >Privacy Policy</a>*
                </template>
            </v-checkbox>
        </ValidationProvider> -->

        <v-btn class="mr-4" @click="submit">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
    </ValidationObserver>
</template>

<script>

    import { required, email, max, regex } from 'vee-validate/dist/rules';
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate';

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
        components: {
            ValidationProvider,
            ValidationObserver,
        },
        data: () => ({
            organizationid: '',
            items: [
                '1',
                '2',
                '3',
                '4',
            ],
            name: '',
            smodal: false,
            sdate: null,
            emodal: false,
            edate: null,
            cmodal: false,
            cdate: null,
            location: '',
            description: '',
            contactperson: '',
            phone: '',
            email: '',
            totalvolunteersneeded: '',
            imageupload: null,
            checkbox: null,
            rules: '',
            requiredRules: '',
            enabled: false,
        }),

        methods: {
            submit() {
                this.$refs.observer.validate();
                this.$refs.form.validate();
            },
            clear() {
                this.organizationid = '';
                this.name = '';
                this.location = '';
                this.description = '';
                this.contactperson = '';
                this.phone = '';
                this.email = '';
                this.totalvolunteersneeded = '';
                this.imageupload = null;
                this.checkbox = null;
                this.$refs.observer.reset();
                this.$refs.form.reset();
            },
        },
    };
</script>