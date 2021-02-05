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
    export default {
        name: 'SignIn',
        data() {
            return {
                user: {},
                email: '',
                password: null,
                googlesso: null,
                isAuthenticated: false,
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
            login() {
                fetch("/auth/users/" + this.email)
                    .then(response => response.json())
                    .then(data => this.user = data[0])
                    .then(() => this.validateUser())
                    .catch(error => this.errorMesg = "Sign-In Error: Please ensure you entered a valid email and password. " + error);
            },
            validateUser() {
                let { errorMesg, ...rest } = this.$data;
                errorMesg = "";
                console.log(errorMesg, rest);
                fetch("/auth/signin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(rest)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        //signin={authObj => this.setToken(authObj)} isAuthenticated={isAuthenticated}

                        //this.props.signin(data.user);
                        //setUserSession(data.token, data.user);
                    })
                    .catch(error => this.errorMesg = "Validation Error: Please ensure you entered a valid email and password. " + error);
            },
            // logout() {
            //     removeUserSession();
            //     this.setState({ isAuthenticated: false});
            // },
          
        }

    }
</script>

<style scoped>

</style>