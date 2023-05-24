
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from server-side API!' });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});



// const express = require('express');
// const cors = require('cors');

// const app = express();

// app.use(cors());
// app.use(express.static('public'));

// app.get('/api/hello', (req, res) => {
//   res.json({ message: 'Hello from server-side API!' });
// });

// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });
