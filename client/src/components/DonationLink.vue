<template>
    <v-card
    class="mx-auto"
    max-width="450"
    >
        <v-img
            class="white--text align-end"
            :src="require('@/assets/donate.jpg')"
            aspect-ratio="1"
        >
        <v-card-title>You can make a difference</v-card-title>
        </v-img>

        <!-- <v-card-subtitle class="pb-0">
        Photo by <a href="https://unsplash.com/@processrepeat?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Nathan Lemon</a> on <a href="https://unsplash.com/collections/8469874/volunteer?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>
        </v-card-subtitle> -->

        <v-card-actions>
        <v-btn
            color="pink"
            dark
            small
            absolute
            right
            fab
            class="custom-dbox-popup" 
            href="https://donorbox.org/sejiwa?default_interval=o&amount=3.0"
        >
        <v-icon>favorite</v-icon>
        </v-btn>

        <div style="color:orange; padding:5px;">
            <strong>DONATE FOR A GOOD CAUSE?  <i class="fas fa-angle-double-right"></i><i class="fas fa-angle-double-right"></i><i class="fas fa-angle-double-right"></i></strong>
        </div>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "DonationLink",
}
</script>