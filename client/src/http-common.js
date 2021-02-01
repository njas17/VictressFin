import axios from 'axios';

const config = require('dotenv').config();
const token = process.env.TWITTER_BEARER_TOKEN

export const HTTP = axios.create({
    baseURL: `https://api.twitter.com/2/tweets/search/recent`,
    headers: {
        "authorization": `Bearer ${token}`
    }
})