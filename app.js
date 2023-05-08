
function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false);
  xmlHttp.send();
  return xmlHttp.responseText;
}

var results = JSON.parse(httpGet("https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple"));

var questionContainer = document.getElementById("question-container");
var submitButton = document.getElementById("submit-btn");
var resultContainer = document.getElementById("result");
var restartButton = document.getElementById("restart-btn");

var currentQuestionIndex = 0;
var correctAnswers = 0;

function renderQuestion(index) {
  questionContainer.style.display = "block";

  var question = results.results[index];

  var questionDiv = document.createElement("div");
  questionDiv.classList.add("question");

  var questionNumber = document.createElement("p");
  questionNumber.innerText = "Question " + (index + 1);
  questionNumber.classList.add("question-number");

  var questionText = document.createElement("p");
  questionText.innerHTML = question.question;
  questionText.classList.add("question-text");

  var optionsDiv = document.createElement("div");
  optionsDiv.classList.add("options");

  var options = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);

  options.forEach((option) => {
    var optionDiv = document.createElement("div");
    optionDiv.classList.add("option");

    var input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "question-" + index);
    input.setAttribute("value", option);

    var label = document.createElement("label");
    label.innerHTML = option;

    optionDiv.appendChild(input);
    optionDiv.appendChild(label);
    optionsDiv.appendChild(optionDiv);
  });

  questionDiv.appendChild(questionNumber);
  questionDiv.appendChild(questionText);
  questionDiv.appendChild(optionsDiv);

  questionContainer.appendChild(questionDiv);
}

function checkAnswer() {
  var selectedOption = document.querySelector('input[name="question-' + currentQuestionIndex + '"]:checked');
  if (!selectedOption) {
    resultContainer.innerText = "Please select an answer.";
    return;
  }

  var answer = selectedOption.value;
  var question = results.results[currentQuestionIndex];
  if (answer === question.correct_answer) {
    resultContainer.innerText = "Correct!";
    correctAnswers++;
  } else {
    resultContainer.innerText = "Incorrect. The correct answer is: " + question.correct_answer;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex >= results.results.length) {
    submitButton.style.display = "none";
    questionContainer.style.display = "none";
    resultContainer.innerText = "You got " + correctAnswers + " out of " + results.results.length + " questions correct!";
    restartButton.style.display = "block";
  } else {
    questionContainer.innerHTML = "";
    renderQuestion(currentQuestionIndex);
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  correctAnswers = 0;
  questionContainer.innerHTML = "";
  resultContainer.innerText = "";
  restartButton.style.display = "none";
  submitButton.style.display = "block";
  renderQuestion(currentQuestionIndex);
}

function submitAnswer() {
  checkAnswer();
}

submitButton.addEventListener("click", submitAnswer);
restartButton.addEventListener("click", restartQuiz);

var startButton = document.getElementById("start-btn");
startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  submitButton.style.display = "block";
  renderQuestion(currentQuestionIndex);
});
