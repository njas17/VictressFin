<template>
    <v-app class="authpage">
        <v-row>
            <v-col cols="12" sm="2">
            </v-col>
            <v-col cols="8" elevation="5" sm="8">
                <v-sheet class="authbox" min-height="70vh" fill-height fluid>
                    <v-row>
                        <v-col cols="6" class="welcome" justify-center>Welcome to Sejiwa.</v-col>
                        <v-col cols="6">
                            <v-card class="signup">
                                <v-card-title>
                                    <span class="headline">Member Sign-Up / Profile</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="First Name*" required></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Last Name*" required>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field label="Email*" required></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field label="Password*" type="password" required></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field label="Organization/Company*" hint="Choose Others/Personal if you do not belong to any of the listed organization" persistent-hint required></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                    <small>*indicates required field</small>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="dialog = false">
                                        Reset
                                    </v-btn>
                                    <v-btn color="blue darken-1" text @click="dialog = false">
                                        Save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
            <v-col cols="12" sm="2">
            </v-col>
        </v-row>
    </v-app>
</template>

<script>
    import { HelperMixin } from '../mixins/HelperMixin';
    export default {
        name: 'SignUp',
        mixins: [HelperMixin],
        user: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
        },
        isRegistered: false,
        isLogged: false,
        errorMesg: ''
    }
</script>

<style scoped>
    .col, .col-sm-6, .col-md-6, .col-12 {
        padding: 0;
    }
    .authbox .row {
        margin: 0;
        padding: 0;
    }
    .authpage {
        background-color: #d1d1d1;
        padding-top: 30px;
        margin-top: 30px;
    }

    .authbox {
        background: linear-gradient(to bottom, #311b92 8%, #12182e 67%);
        box-shadow: 5px 10px 18px #888888;
    }
    .signup {
        margin: 15px 15px 0;
    }
    .welcome {
        color: white;
    }
</style>