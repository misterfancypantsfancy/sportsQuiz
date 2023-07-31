const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json()); // Parse JSON request bodies

const dbFilePath = path.join(__dirname, '..', 'db', 'quizdata.json');

function initializeUserData(userId) {
  return {
    [userId]: {
      answered: [],
    },
  };
}

function readQuizData() {
  try {
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading quiz data:', error);
    return {};
  }
}

function writeQuizData(quizData) {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(quizData, null, 2));
  } catch (error) {
    console.error('Error writing quiz data:', error);
  }
}

app.get('/api/users/:userId', (req, res) => {
  const { userId } = req.params;
  console.log(`Reached ${userId} endpoint (GET)`);

  const quizData = readQuizData();
  const userData = quizData[userId] || { answered: [] };
  const totalQuestionsAnswered = userData.answered.length;

  res.json({ totalQuestionsAnswered });
});

app.post('/api/users/:userId', (req, res) => {
  const { userId } = req.params;
  console.log(`Reached ${userId} endpoint (POST)`);

  const quizData = readQuizData();
  const userData = quizData[userId] || initializeUserData(userId);

  // Update the answered questions count
  userData.answered.push(req.body.question);

  // Write the updated quiz data back to the JSON file
  quizData[userId] = userData;
  writeQuizData(quizData);

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
