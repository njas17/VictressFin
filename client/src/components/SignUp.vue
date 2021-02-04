<template>
    <v-app class="authpage">
        <v-row>
            <v-col cols="12" sm="2">
            </v-col>
            <v-col cols="8" sm="8">
                <v-sheet elevation="5" class="authbox" min-height="40vh">
                    <v-row>
                        <v-col cols="5" class="welcome">
                            <p>Member Sign-Up/Profile Registration.</p>
                            <p>Welcome to Sejiwa.</p>
                        </v-col>
                        <v-col cols="7">
                            <v-card class="signup">
                                <v-card-text>
                                    <v-container>
                                        <v-form ref="form" v-model="valid" lazy-validation>
                                            <v-row>
                                                <v-col cols="12" sm="6" md="6">
                                                    <v-text-field v-model="user.firstname" label="First Name*" required>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="6">
                                                    <v-text-field v-model="user.lastname" label="Last Name*" required>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="6">
                                                    <v-text-field v-model="user.email" label="Email*" required>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="6">
                                                    <v-text-field v-model="user.contactnum" label="Contact #" required>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-text-field v-model="user.password" label="Password*"
                                                        type="password" required></v-text-field>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-text-field v-model="user.organization_id"
                                                        label="Organization/Company*"
                                                        hint="Choose Others/Personal if you do not belong to any of the listed organization"
                                                        persistent-hint required></v-text-field>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-text-field v-model="user.address1" label="Address*" required>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="6">
                                                    <v-text-field v-model="user.state" label="State*" required>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="6">
                                                    <v-text-field v-model="user.country" label="Country*" required>
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-form>
                                    </v-container>
                                    <v-alert v-if="isRegistered" color="success" dark icon="mdi-check-bold"
                                        border="left" prominent>
                                        Success. Your profile has been registered. Please login to proceed to the member
                                        page.
                                    </v-alert>
                                </v-card-text>
                                <v-card-actions>

                                    <v-spacer><small>*indicates required field</small></v-spacer>
                                    <v-btn color="blue darken-1" text @click="resetFields">
                                        Reset
                                    </v-btn>
                                    <v-btn color="blue darken-1" text @click="userSignUp">
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
        data() {
            return {
                user: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    contactnum: '',
                    password: null,
                    state: '',
                    country: '',
                    organization_id: 2,
                    address1: ''
                },
                isRegistered: false,
                //isLogged: false,
                errorMesg: ''
            }
        },
        methods: {
            userSignUp() {
                if (this.user.firstname === "" || this.user.lastname === "" || this.user.email === "" || this.user.password === "" || this.user.organization_id === null) {
                    this.errorMesg = "All fields are required. Please provide the information.";
                    return;
                }

                this.checkAddUser();

            },
            checkAddUser() {
                fetch("/api/users/" + this.user.email)
                    .then(response => response.json())
                    .then(data => {
                        if (data.length > 0) this.errorMesg = "Sorry. The email you have provided is already registered in this site.";
                        else this.addUser();
                    })
                    .catch(error => {
                        console.error("Error in check email: ", error);
                        this.errorMesg = "Error on email. Please ensure email is provided.";
                    });
            },
            addUser() {
                fetch("/api/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.user)
                })
                    .then(response => {
                        response.json();
                        this.isRegistered = true;
                        this.resetFields();
                    })
                    .catch(error => {
                        console.error("Error in add user: ", error);
                    });
            },
            resetFields() {
                this.$refs.form.reset();
            }

        }
    }
</script>

<style scoped>
    body {
        background-color: #d1d1d1;
    }

    .col,
    .col-sm-6,
    .col-md-6,
    .col-12 {
        padding: 0;
    }

    .authbox .row {

        padding: 0;
        height: 450px;
    }

    .authpage {
        background-color: #d1d1d1;
        padding-top: 30px;
    }

    .authbox {
        margin-top: 50px;
        background: linear-gradient(to bottom, #311b92 8%, #12182e 67%);
        box-shadow: 5px 10px 18px #888888;
        border-radius: 10px;
    }

    .signup {
        margin: -40px 50px 15px -20px;
        position: relative;
        background-color: #FAFAFA;
    }

    .welcome {
        color: white;
        margin: auto;
        padding-left: 30px;
    }
</style>