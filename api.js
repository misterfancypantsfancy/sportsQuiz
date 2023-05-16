
//client side api call
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/hello', (req, res) => {
  res.send('Hello from /hello route!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});













//server side api call
const express = require('express');
const app = express();

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from server-side API!' });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
