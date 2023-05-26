
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from server-side API!' });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


//these are the routes I'll need to make data persist across... something, users I guess

// api/user     this one will return the data for the user, it will be a GET api.user
// POST          api/user/results        or api/user/answers


//GET
// create a function that whenever you request api/user it reads a json file to disc and return that json file
// find out how to read a file in node.js
// result.json   line 11   aka res.json


// POST
// your client has to send a JSON payload to the client
// on the server side the POST reads the body of the request, it will have a JSON payload
// on line 11 you have 2 arguments req and res
// the simplest thing to do is every single time the user answers a question, you send to server
// whether they got it right or wrong
// the scrub handler will read the JSON, the JSON can be result: right or wrong
// file with json, the schema for that json will be 2 key value pairs, one is right answers and the other wrong answers
// the function aka post handler needs to do is see if the answer is right or wrong, then it will load the
// user file into memory and then increment the right or wrong, then saves the file to disc aka updates the file


// FETCH
// the client will do 2 things, read
// whenever the page loads, create a very simple panel, it will say how many wrong, how many right
// it can be percentage of wrong vs right if you want, put this next to the selec near the top
// it will be 2 requests, the trivia questions and query the local server for user information
// and then display the data

// whenever you answer a question do another FETCH, but it's a POST
// send a JSON payload in the body that is a key value pair indicating if the value is right or wrong

// for now don't worry about user2, just read to the same file and write to the same file