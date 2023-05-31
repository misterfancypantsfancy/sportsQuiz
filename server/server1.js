
// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');

// const app = express();

// app.use(cors());
// app.use(express.static(path.join(__dirname, '../public')));

// app.get('/api/hello', (req, res) => {
//   res.json({ message: 'Hello from server-side API!' });
// });

// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });

// app.get('/api/user', (req, res) => {
//   fs.readFile('user.json', 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading user data:', err);
//       res.sendStatus(500);
//     } else {
//       const userData = JSON.parse(data);
//       res.json(userData);
//     }
//   });
// });

// app.post('/api/user/results', (req, res) => {
//   const result = req.body.result;

//   fs.readFile('user.json', 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading user data:', err);
//       res.sendStatus(500);
//     } else {
//       const userData = JSON.parse(data);
//       if (result) {
//         userData.right_answers++;
//       } else {
//         userData.wrong_answers++;
//       }
//       const updatedData = JSON.stringify(userData);

//       fs.writeFile('user.json', updatedData, 'utf8', err => {
//         if (err) {
//           console.error('Error writing user data:', err);
//           res.sendStatus(500);
//         } else {
//           res.sendStatus(200);
//         }
//       });
//     }
//   });
// });
