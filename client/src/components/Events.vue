<template>
    <v-container>
        <div class="events">
            <v-container class="top">
                <!-- <v-row> -->
                    <div class="col-md-6">
                        <donation-link/>
                    </div>
                    <div class="col-md-6">
                        <h3>Twitter Highlights #VirtualVolunteer</h3><br/>
                        <ul class="juicer-feed" data-feed-id="virtualvolunteer"><h1 class="referral"></h1></ul>
                    </div>
                <!-- </v-row> -->
            </v-container><br/>
            <h1>Upcoming Events</h1>
        </div>
        <div class="col-md-12">
            <v-container fluid>
                <v-dialog v-model="volunteerDialog" max-width="500px">
                    <v-toolbar dark color="primary">
                        <v-btn icon dark @click="volunteerDialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Volunteer Application</v-toolbar-title>
                    </v-toolbar>
                    <volunteer-application-form :eventId="selectedEvent" @volunteerApplication="submitApplication" @closeForm="volunteerDialog=false" />
                </v-dialog>

                <v-data-iterator :items="items" :items-per-page.sync="itemsPerPage" :page="page" :search="search"
                    :sort-by="sortBy.toLowerCase()" :sort-desc="sortDesc" hide-default-footer>
                    <template v-slot:header>
                        <v-toolbar dark color="blue darken-4" class="mb-1">
                            <v-text-field v-model="search" clearable flat solo-inverted hide-details
                                prepend-inner-icon="mdi-magnify" label="Search"></v-text-field>
                            <template v-if="$vuetify.breakpoint.mdAndUp">
                                <v-spacer></v-spacer>
                                <v-select v-model="sortBy" flat solo-inverted hide-details :items="keys"
                                    prepend-inner-icon="mdi-magnify" label="Sort by"></v-select>
                                <v-spacer></v-spacer>
                                <v-btn-toggle v-model="sortDesc" mandatory>
                                    <v-btn depressed large color="blue darken-3" :value="false">
                                        <v-icon>mdi-arrow-up</v-icon>
                                    </v-btn>
                                    <v-btn depressed large color="blue darken-3" :value="true">
                                        <v-icon>mdi-arrow-down</v-icon>
                                    </v-btn>
                                </v-btn-toggle>
                            </template>
                        </v-toolbar>
                    </template>

                    <template v-slot:default="props">
                        <v-row>
                            <v-col v-for="item in props.items" :key="item.eid" cols="12" sm="6" md="4" lg="3">
                                <v-card class="mx-auto my-12" max-width="380">
                                    <v-img height="200" src="https://cdn.vuetifyjs.com/images/cards/cooking.png">
                                    </v-img>
                                    <v-card-title class="pb-2">{{ item.name | truncate(27, '...') }}</v-card-title>
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
                                    </v-card-actions>


                                    <!-- <v-dialog v-model="dialog" persistent max-width="600px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn text color="deep-purple accent-4" v-bind="attrs" v-on="on">
                                                Apply
                                            </v-btn>
                                        </template>
                                        <volunteer-application-form @handleDialog="handleDialog" />
                                    </v-dialog> -->
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
import { CommonMixin } from '../mixins/CommonMixin';
import DonationLink from './DonationLink.vue';
import VolunteerApplicationForm from './VolunteerApplicationForm.vue';

export default {
    components: { VolunteerApplicationForm, DonationLink },
    name: "Events",
    mixins: [CommonMixin],
    data: () => ({
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
    }),
    created() {
        this.getEvents();
    },
    computed: {
        numberOfPages() {
            return Math.ceil(this.items.length / this.itemsPerPage)
        },
        filteredKeys() {
            return this.keys.filter(key => key !== 'Name')
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
        submitApplication() {

        }
    }
};
</script>

<style scoped>
    .v-card__title {
        font-size: 1em;
    }

    .top {
        display: inline-flex;
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