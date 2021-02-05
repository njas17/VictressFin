<template>
    <v-app class="authpage">
        <v-container class="authbox">
            <v-card class="welcome">
                some welcome
                <p>Member Sign-Up/Profile Registration.</p>
                <p>Welcome to Sejiwa.</p>
            </v-card>
            <v-card>
                <v-tabs background-color="deep-purple accent-4" center-active dark>
                    <v-tabs-slider color="yellow"></v-tabs-slider>
                    <v-tab>Login</v-tab>
                    <v-tab>Sign-Up</v-tab>
                    <v-tab-item>
                        <sign-in />
                    </v-tab-item>
                    <v-tab-item>
                        <sign-up />
                    </v-tab-item>

                </v-tabs>
            </v-card>
        </v-container>
    </v-app>
</template>

<script>
    import SignUp from './SignUp.vue';
    import SignIn from './SignIn.vue';

    export default {
        components: { SignUp, SignIn },
        name: 'AuthPage',
        data() {
            return {
                showLogin: true,
                //isLogged: false,
                errorMesg: '',
            }
        },
    }
</script>

<style>
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
    }

    .authpage {
        background-color: #d1d1d1;
        padding-top: 30px;
    }

    .authbox {
        margin-top: 3 0px;
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