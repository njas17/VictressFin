<template>
    <v-card>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="First name*" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Last name*" hint="example of persistent helper text" persistent-hint
                            required></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field label="Email*" required></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field label="Contact Number*" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Address 1*" required></v-text-field>
                    </v-col>   
                    <v-col cols="12">
                        <v-text-field label="Address 2"></v-text-field>
                    </v-col>  
                    <v-col cols="4">
                        <v-text-field label="State" required></v-text-field>
                    </v-col>                    
                    <v-col cols="4">
                        <v-text-field label="State" required></v-text-field>                      
                    </v-col>    
                    <v-col cols="4">
                        <v-text-field label="Country" required></v-text-field>
                    </v-col>                                                      
                    <!-- <v-col cols="12" sm="6">
                        <v-autocomplete
                            :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                            label="Interests" multiple></v-autocomplete>
                    </v-col> -->
                </v-row>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="$emit('closeForm')">
                Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="handleSubmit">
                Submit
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: 'VolunteerApplicationForm',
        props: {},

        methods: {
            handleDialog() {
                this.$emit('handleDialog');
            },
            handleSubmit() {
                
            }
        }


    }
</script>

<style>

</style>