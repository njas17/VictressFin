<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                Welcome to Sejiwa!
            </v-card-title>
        </v-card>
        Please <router-link class="ml-1 text-decoration-none" to="/member">click</router-link> to continue to the member page.
        Thank You.
    </v-container>
</template>

<script>
    export default {
        name: 'PrivateAccess'
    }
</script>