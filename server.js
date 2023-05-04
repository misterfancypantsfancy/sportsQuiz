const fetch = require('node-fetch');
const express = require('express');
const app = express();

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Serve the index.js file
app.get('/index.js', (req, res) => {
  res.sendFile(__dirname + '/index.js');
});

// Serve the index.css file
app.get('/index.css', (req, res) => {
  res.sendFile(__dirname + '/index.css');
});

// Serve the API data
app.get('/api/data', async (req, res) => {
  try {
    const response = await fetch('https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple');
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
