<template>
    <v-container class="bg-img">
        <v-row>
            <v-col>
                <iframe allowpaymentrequest="" frameborder="0" height="900px" name="donorbox" scrolling="no" seamless="seamless" src="https://donorbox.org/embed/sejiwa?default_interval=o&amount=3.00" style="max-width: 500px; min-width: 250px; max-height:none!important; padding: 30px; padding-left: 50px;" width="100%"></iframe>
            </v-col>  
            <v-col style="padding: 50px; padding-top: 150px; color: teal;">
                <h1>It's not how much we give.</h1><br/>
                <h1>It's how much love <v-icon class="red--text">favorite</v-icon></h1> 
                <h1>we put into giving.</h1><br/>
                <h2>- M. Teresa</h2>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "Donate",
}
</script>

<style scoped>
    .bg-img {
    /* The image used */
    background-image: url("https://images.pexels.com/photos/593396/pexels-photo-593396.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260");

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    }

</style>