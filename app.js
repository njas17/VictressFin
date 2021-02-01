let createError = require('http-errors');
let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require("cors");

const needle = require('needle');
const config = require('dotenv').config();
const token = process.env.TWITTER_BEARER_TOKEN

// let indexRouter = require('./routes/index');
let apiRouter = require('./routes/api');

let app = express();

// let rulesURL = 'https://api.twitter.com/2/tweets/search/recent'
// let streamURL =
//   'https://api.twitter.com/2/tweets/search/recent?query=tweet.fields&expansions=author_id'

// let rules = [{ value: 'virtualvolunteer' }]

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", function(req, res, next) {
  res.send("Access the API at path /api");
});

//app.use('/', indexRouter);
app.use('/api', apiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

// const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent'

// async function getRequest() {

//   // Edit query parameters below
//   const params = {
//       'query': 'virtualvolunteer',
//       'tweet.fields': 'author_id'
//   }

//   const res = await needle('get', endpointUrl, params, {
//       headers: {
//           "authorization": `Bearer ${token}`
//       }
//   })

//   if (res.body) {
//       return res.body;
//   } else {
//       throw new Error('Unsuccessful request')
//   }
// }

// app.get('api/highlights', async (req, res) => {
//   const tweets = [];
//   await getRequest(req.params)
//   .then(results => {
//     res.send(results.data);
//     tweets.push(data);
//   })
//   .catch(err => {
//     res.status(500).send(err);
//     process.exit(-1);
//   })
//   process.exit();
// });

// // Get stream rules
// async function getRules() {
//   const response = await needle('get', rulesURL, {
//     headers: {
//       Authorization: `Bearer ${BEARER_TOKEN}`,
//     },
//   })
//   // console.log(response.body)
//   return response.body
// }

// // Set stream rules
// async function setRules() {
//   const data = {
//     add: rules,
//   }

//   const response = await needle('post', rulesURL, data, {
//     headers: {
//       'content-type': 'application/json',
//       Authorization: `Bearer ${BEARER_TOKEN}`,
//     },
//   })

//   return response.body
// }

// // Delete stream rules
// async function deleteRules(rules) {
//   if (!Array.isArray(rules.data)) {
//     return null
//   }

//   const ids = rules.data.map((rule) => rule.id)

//   const data = {
//     delete: {
//       ids: ids,
//     },
//   }

//   const response = await needle('post', rulesURL, data, {
//     headers: {
//       'content-type': 'application/json',
//       Authorization: `Bearer ${BEARER_TOKEN}`,
//     },
//   })

//   return response.body
// }

// function streamTweets() {
//   const stream = needle.get(streamURL, {
//     headers: {
//       Authorization: `Bearer ${BEARER_TOKEN}`,
//     },
//   })

//   stream.on('data', (data) => {
//     try {
//       const json = JSON.parse(data)
//       console.log(json)
//       // socket.emit('tweet', json)
//     } catch (error) {}
//   })

//   // return stream
// }

// ;(async () => {
//   let currentRules

//   try {
//     // Get all stream rules
//     currentRules = await getRules()

//     // Delete all stream rules
//     await deleteRules(currentRules)

//     // Set rules based on array above
//     await setRules()
//   } catch (error) {
//     console.error(error)
//     process.exit(1)
//   }

//   streamTweets()
// })()

// io.on('connection', async () => {
//   console.log('Client connected...')

//   let currentRules

//   try {
//     //   Get all stream rules
//     currentRules = await getRules()

//     // Delete all stream rules
//     await deleteRules(currentRules)

//     // Set rules based on array above
//     await setRules()
//   } catch (error) {
//     console.error(error)
//     process.exit(1)
//   }

//   const filteredStream = streamTweets(io)

//   let timeout = 0
//   filteredStream.on('timeout', () => {
//     // Reconnect on error
//     console.warn('A connection error occurred. Reconnecting…')
//     setTimeout(() => {
//       timeout++
//       streamTweets(io)
//     }, 2 ** timeout)
//     streamTweets(io)
//   })
// })

module.exports = app;
