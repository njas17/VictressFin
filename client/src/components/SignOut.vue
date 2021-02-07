<template>
    <v-container fill-height fluid>
        <v-row></v-row>
        <v-row >
            <v-col>
                <v-alert class="logout" color="primary" dark icon="mdi-check-bold" border="left" prominent>
                    <p>You are not logged in or you have logged out. </p>
                    <p>Thank You.</p>
                </v-alert>
            </v-col>
        </v-row>

    </v-container>
</template>

<style scoped>
    .logout {
        margin: 50px auto;
        max-width: 550px;
    }
</style>