const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json()); // Parse JSON request bodies

// Endpoint to get the total number of questions answered by a user
app.get('/api/users/:userId', (req, res) => {
  const { userId } = req.params;
  console.log(`Reached ${userId} endpoint (GET)`);

  const dataFilePath = path.join(__dirname, '..', 'db', 'quizdata.json');

  // Read the quiz data from the JSON file
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading quiz data:', err);
      res.status(500).json({ error: 'Failed to retrieve quiz data' });
      return;
    }

    try {
      const quizData = JSON.parse(data);
      const userData = quizData[userId] || { answered: [] };
      const totalQuestionsAnswered = userData.answered.length;

      res.json({ totalQuestionsAnswered });
    } catch (error) {
      console.error('Error parsing quiz data:', error);
      res.status(500).json({ error: 'Failed to parse quiz data' });
    }
  });
});

// Endpoint to update the total number of questions answered by a user
app.post('/api/users/:userId', (req, res) => {
  const { userId } = req.params;
  console.log(`Reached ${userId} endpoint (POST)`);

  const dataFilePath = path.join(__dirname, '..', 'db', 'quizdata.json');

  // Read the quiz data from the JSON file
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading quiz data:', err);
      res.status(500).json({ error: 'Failed to retrieve quiz data' });
      return;
    }

    try {
      const quizData = JSON.parse(data);
      const userData = quizData[userId] || { answered: [] };

      // Update the answered questions count
      userData.answered.push(req.body.question);

      // Write the updated quiz data back to the JSON file
      fs.writeFile(dataFilePath, JSON.stringify(quizData), (err) => {
        if (err) {
          console.error('Error writing quiz data:', err);
          res.status(500).json({ error: 'Failed to update quiz data' });
          return;
        }

        res.sendStatus(200);
      });
    } catch (error) {
      console.error('Error parsing quiz data:', error);
      res.status(500).json({ error: 'Failed to parse quiz data' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
