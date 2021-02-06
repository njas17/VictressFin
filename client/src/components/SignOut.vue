<template>
    <v-container>
        <v-row>
            <v-col cols="4" >
              <v-card height="200"></v-card>
            </v-col>
            <v-col cols="4" >
                <v-card height="200"></v-card>
              </v-col>          
        </v-row>

    </v-container>
    
</template>

<script>
    import { HelperMixin } from '../mixins/HelperMixin';
    export default {
        name: 'SignOut',
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
    // logout() {
    //     removeUserSession();
    //     this.setState({ isAuthenticated: false});
    // },
</script>

<style>

</style>