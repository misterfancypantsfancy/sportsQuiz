  
function httpGet(theUrl) {
  return fetch(theUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      console.error('Error:', error);
    });
}

let results;

httpGet("https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple")
  .then(data => {
    results = data;
  });

const startButton = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const submitButton = document.getElementById("submit-btn");
const resultContainer = document.getElementById("result");
const restartButton = document.getElementById("restart-btn");
const score = document.getElementById("score");

const questionDiv = document.getElementById("questionDiv");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("optionsDiv");
const optionDiv = document.getElementById("option");

const dropdown = document.getElementById("userDropdown");
const user1 = dropdown.options[0];

const displayDashboardButton = document.getElementById("display-dashboard-btn")
const dashboardContainer = document.getElementById("dashboard-container");
const quizHistory = document.getElementById("quiz-history")

let currentQuestionIndex = 0;
let correctAnswers = 0;

function renderQuestion(index) {
  questionContainer.style.display = "block";

  let question = results.results[index];

  questionNumber.innerHTML = "Question " + (index + 1);

  questionText.innerHTML = question.question;

  let shuffle = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);

  shuffle.forEach((option, idx) => {
      const input = document.getElementById("input" + (idx + 1));
      const label = document.getElementById("label" + (idx + 1));

      input.setAttribute("name", "question-" + index);
      input.setAttribute("value", option);
      input.checked = false;

      label.innerHTML = option;
  });
}

function checkAnswer() {
  let selectedOption = document.querySelector('input[name="question-' + currentQuestionIndex + '"]:checked');
  if (!selectedOption) {
      resultContainer.innerHTML = "Please select an answer.";
      return;
  }

  let answer = selectedOption.value;
  let question = results.results[currentQuestionIndex];
  if (answer === question.correct_answer) {
      resultContainer.innerHTML = "Correct!";
      correctAnswers++;
  } else {
      resultContainer.innerHTML = "Incorrect. The correct answer is: " + question.correct_answer;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex >= results.results.length) {
      score.innerHTML = "You got " + correctAnswers + " out of " + results.results.length + " questions correct!";
      restartButton.style.display = "block";
      score.style.display = "block";
      submitButton.style.display = "none";
  } else {
      renderQuestion(currentQuestionIndex);
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  correctAnswers = 0;
  resultContainer.innerHTML = "";
  restartButton.style.display = "none";
  submitButton.style.display = "block";
  score.style.display = "none";

  httpGet("https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple")
      .then(data => {
      results.results = data.results;
      renderQuestion(currentQuestionIndex);
      });
}

function updateQuizHistory() {
  // Retrieve the total questions answered by user1 from the server
  console.log('Making fetch request');
  fetch('http://localhost:3000/api/user1')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Update the quizHistory element with the total questions answered
      quizHistory.innerHTML = "Total questions answered: " + data.totalQuestionsAnswered;
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle the error
    });
}

// Call the function to update the quiz history initially
updateQuizHistory();

function submitAnswer() {
  checkAnswer();
  console.log('Making POST request');
  fetch('http://localhost:3000/api/user1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question: questionText.innerHTML }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Handle the successful update
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle the error
    });
}

submitButton.addEventListener("click", submitAnswer);
restartButton.addEventListener("click", restartQuiz);

startButton.addEventListener("click", () => {
  startButton.style.display = "none"
  submitButton.style.display = "block"
  renderQuestion(currentQuestionIndex)
})

displayDashboardButton.addEventListener('click', () => {
  if (dashboardContainer.style.display === 'block') {
    dashboardContainer.style.display = 'none';
  } else {
    dashboardContainer.style.display = 'block';
  }
});
