<template>
    <v-container>
        <div class="col-md-12">
            <v-container fluid>
                <v-dialog v-model="volunteerDialog" max-width="500px">
                    <v-toolbar dark color="primary">
                        <v-btn icon dark @click="volunteerDialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Volunteer Application</v-toolbar-title>
                    </v-toolbar>
                    <volunteer-application-form :eventId="selectedEvent" @volunteerApplication="submitApplication"
                        @closeForm="volunteerDialog=false" />
                </v-dialog>
                <p id="eventsSection"></p>
                <v-data-iterator :items="items" :items-per-page.sync="itemsPerPage" :page="page" :search="search"
                    :sort-by="sortBy.toLowerCase()" :sort-desc="sortDesc" hide-default-footer>
                    <template v-slot:header>
                        <v-toolbar dark color="indigo accent-4" class="mt-1">
                            <v-text-field v-model="search" clearable flat solo-inverted hide-details
                                prepend-inner-icon="mdi-magnify" label="Search for an Upcoming Event"></v-text-field>
                            <template v-if="$vuetify.breakpoint.mdAndUp">
                                <v-spacer></v-spacer>
                                <v-select v-model="sortBy" flat solo-inverted hide-details :items="keys"
                                    prepend-inner-icon="mdi-magnify" label="Sort by"></v-select>
                                <v-spacer></v-spacer>
                                <v-btn-toggle v-model="sortDesc" mandatory>
                                    <v-btn depressed large color="indigo accent-3" :value="false">
                                        <v-icon>mdi-arrow-up</v-icon>
                                    </v-btn>
                                    <v-btn depressed large color="indigo accent-3" :value="true">
                                        <v-icon>mdi-arrow-down</v-icon>
                                    </v-btn>
                                </v-btn-toggle>
                            </template>
                        </v-toolbar>
                    </template>

                    <template v-slot:default="props">
                        <v-row>
                            <v-col v-for="item in props.items" :key="item.eid" cols="12" sm="6" md="4" lg="3">
                                <v-card class="my-5" max-width="380">
                                    <v-img height="200" :src="item.images">
                                    </v-img>
                                    <v-card-title class="pb-2 text-justify">{{ item.name | truncate(27, '...') }}</v-card-title>
                                    <v-card-text>
                                        <div class="my-3 subtitle-2">By: {{ item.organization }}</div>
                                        <div class="my-1 descr">{{ item.description }}</div>
                                    </v-card-text>
                                    <v-divider class="mx-2"></v-divider>
                                    <v-card-text>
                                        <div class="font-weight-medium">Total volunteer required: {{ item.totalvolunteer
                                            }}</div>
                                        <div>Closing date: {{ getLocaleDate(item.closing) }}</div>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn text color="deep-purple accent-4" @click="openVolunteerForm(item.eid)">
                                            Apply
                                        </v-btn>

                                        <v-spacer></v-spacer>

                                        <v-btn
                                            icon
                                            @click="show = !show"
                                        >
                                            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                        </v-btn>
                                    </v-card-actions>

                                    <v-expand-transition>
                                        <div v-show="show">
                                            <v-divider></v-divider>

                                            <v-card-text class="text-justify">
                                                <h3>{{item.name}}</h3>
                                                <v-spacer></v-spacer>
                                                {{item.description}}
                                            </v-card-text>
                                        </div>
                                    </v-expand-transition>
                                </v-card>
                            </v-col>
                        </v-row>
                    </template>

                    <template v-slot:footer>
                        <v-row class="mt-2" align="center" justify="center">
                            <span class="grey--text">Items per page</span>
                            <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn dark text color="primary" class="ml-2" v-bind="attrs" v-on="on">
                                        {{ itemsPerPage }}
                                        <v-icon>mdi-chevron-down</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item v-for="(number, index) in itemsPerPageArray" :key="index"
                                        @click="updateItemsPerPage(number)">
                                        <v-list-item-title>{{ number }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>

                            <v-spacer></v-spacer>

                            <span class="mr-4
                            grey--text">
                                Page {{ page }} of {{ numberOfPages }}
                            </span>
                            <v-btn fab dark color="blue darken-3" class="mr-1" @click="formerPage">
                                <v-icon>mdi-chevron-left</v-icon>
                            </v-btn>
                            <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
                                <v-icon>mdi-chevron-right</v-icon>
                            </v-btn>
                        </v-row>
                    </template>

                </v-data-iterator>
            </v-container>

        </div>
    </v-container>
</template>

<script>
    import { HelperMixin } from '../mixins/HelperMixin';
    import VolunteerApplicationForm from './VolunteerApplicationForm.vue';

    export default {
        components: { VolunteerApplicationForm },
        name: "Events",
        mixins: [HelperMixin],
        data() {
            return {
                volunteerDialog: false,
                selectedEvent: 0,
                itemsPerPageArray: [4, 8, 12],
                search: '',
                filter: {},
                sortDesc: false,
                page: 1,
                itemsPerPage: 4,
                sortBy: 'name',
                keys: [
                    'Name',
                    'Description',
                    'Closing',
                    'Organization',
                    'TotalVolunteer',
                ],
                items: [{}],
                newVolunteer: [],
                show: false,
            }
        },
        created() {
            this.getEvents();
        },
        computed: {
            numberOfPages() {
                return Math.ceil(this.items.length / this.itemsPerPage);
            },
            filteredKeys() {
                return this.keys.filter(key => key !== 'Name');
            },
        },
        methods: {
            //Get all events
            getEvents() {
                fetch("/api/events")
                    .then(response => response.json())
                    .then(data => {
                        this.items = data;
                    })
                    .catch(error => {
                        console.error("Error in get events: ", error);
                    });
            },
            nextPage() {
                if (this.page + 1 <= this.numberOfPages) this.page += 1
            },
            formerPage() {
                if (this.page - 1 >= 1) this.page -= 1
            },
            updateItemsPerPage(number) {
                this.itemsPerPage = number
            },
            openVolunteerForm(eid) {
                this.volunteerDialog = true;
                this.selectedEvent = eid;
            },
            submitApplication(data) {
                // console.log("in events - data is:", JSON.stringify(data))
                this.volunteerDialog = false;
                fetch("/api/volunteers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => {
                        response.json();
                    })
                    .catch(error => {
                        console.error("Error in volunteer application submission: ", error);
                    });
            }
        }
    }
</script>

<style scoped>
    .v-card__title {
        font-size: 1em;
    }

    .top {
        display: inline-flex;
    }
    #eventsSection {
        padding-top: 50px;
    }
    .descr {
        margin: 0 auto 4vh auto;
        /* autoprefixer: off */
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
</style>