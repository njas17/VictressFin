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