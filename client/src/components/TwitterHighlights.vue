<template>
    <v-container>
        <h1>Twitter Highlights #VirtualVolunteer</h1>
        <!-- <div>
        <iframe src="http://twubs.com/embed/virtualvolunteer/?messagesPerPage=5&headerBgColor=%231c6485&headerTextColor=%231c6485" width="800" height="750" frameborder="0"><a href="http://twubs.com/virtualvolunteer">#virtualvolunteer</a></iframe>
        </div> -->
        {{ posts }}
        <ul v-if="posts && posts.length">
        <li v-for="post of posts" :key="post.id">
            <p>
            <strong>{{ post.author_id }}</strong>
            </p>
            <p>{{ post.text }}</p>
        </li>
        </ul>

        <ul v-if="errors && errors.length">
        <li v-for="error of errors" :key="error.id">
            {{ error.message }}
        </li>
        </ul>
    </v-container>
</template>

<script>
// import axios from "axios";

const config = require('dotenv');
const token = process.env.TWITTER_BEARER_TOKEN
console.log(config);
console.log(token);
export default {
    name: "TwitterHighlights",
    data: () => ({
        posts: [],
        errors: [],
    }),

    created() {
        this.getTweets()
    },

    methods: {
        getTweets() {
            const proxyurl = `https://cors-anywhere.herokuapp.com/`;
            const url = `https://api.twitter.com/2/tweets/search/recent`;
            fetch(proxyurl + url , {
                params: {
                    'query': 'virtualvolunteer',
                    'tweet.fields': 'author_id'
                },
                headers: {
                    "authorization": `Bearer ${token}`
                },
            })
            .then(response => response.json())
            .then(data => {
                this.posts.push(data);
                console.log(this.posts);
                console.log(data);
            })
            .catch(error => {
                this.errors.push(error);
                process.exit(-1);
            });
            process.exit();
        }
    }
};

</script>

<style>
</style>