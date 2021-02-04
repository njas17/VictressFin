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
                            <sign-up />
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
    import SignUp from './SignUp.vue';
    export default {
        components: { SignUp },
        name: 'AuthPage',
        data() {
            return {
                isRegistered: false,
                //isLogged: false,
                errorMesg: ''
            }
        },
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