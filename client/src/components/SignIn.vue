<template>
    <v-container>
        <v-form ref="form" @submit.prevent="login" lazy-validation>
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="email" label="Email*" required>
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field v-model="password" label="Password*" type="password" required>
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <small>*indicates required field</small>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="resetFields">
                    Reset
                </v-btn>
                <v-btn color="blue darken-1" text @click="userSignIn">
                    OK
                </v-btn>
            </v-row>
            <v-alert v-if="errorMesg!=''" color="red lighten-2" dark icon="mdi-check-bold" border="left" prominent>
                Fail. {{ errorMesg }}.
            </v-alert>
        </v-form>
    </v-container>
</template>

<script>
    import { setUserSession } from '../session'; 

    export default {
        name: 'SignIn',
        data() {
            return {
                user: {},
                email: '',
                password: null,
                googlesso: null,
                errorMesg: ''
            }
        },
        methods: {
            userSignIn() {
                if (this.email === "" || this.password === "") {
                    this.errorMesg = "All fields are required. Please provide the information.";
                    return;
                }
                this.login();

            },
            resetFields() {
                this.$refs.form.reset();
            },
            // the login method will take the user email and pass to the auth api
            // with that information, user data of that particular email is extracted
            // if there is no user with such email, error is thrown
            // if user exists with that email, user validation will occur
            login() {
                fetch("/api/auth/users/" + this.email)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data[0]);
                        this.user = data[0];
                    })
                    .then(() => this.validateUser())
                    .catch(error => this.errorMesg = "Sign-In Error: Please ensure you entered a valid email and password. " + error);
            },
            // user validation api will check on the user password whether it matches with the one stored in the database 
            // validation api expects user email, password, and the whole user obj.
            // once password validity is confirmed, the API will generate a token.
            // this token need to be stored in a state or localstorage            
            validateUser() {
                console.log(JSON.stringify(this.$data));

                fetch("/api/auth/users/signin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.$data)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("result from validation - ", data);
                        this.$store.commit('authenticateTo', true);
                        this.$store.commit('updateUserObj', data.user)
                        setUserSession(data.token, data.user);
                    })
                    .catch(error => this.errorMesg = "Validation Error: Please ensure you entered a valid email and password. " + error);
            },

          
        }

    }
</script>

<style scoped>

</style>