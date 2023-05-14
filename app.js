
function httpGet(theUrl) {
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open("GET", theUrl, false)
  xmlHttp.send()
  return xmlHttp.responseText
}

const results = JSON.parse(httpGet("https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple"))

const startButton = document.getElementById("start-btn")
const questionContainer = document.getElementById("question-container")
const submitButton = document.getElementById("submit-btn")
const resultContainer = document.getElementById("result")
const restartButton = document.getElementById("restart-btn")
const score = document.getElementById("score")

const questionDiv = document.getElementById("questionDiv")
const questionNumber = document.getElementById("questionNumber")
const questionText = document.getElementById("questionText")
const optionsDiv = document.getElementById("optionsDiv")
const optionDiv = document.getElementById("option")

let currentQuestionIndex = 0
let correctAnswers = 0

function renderQuestion(index) {
  questionContainer.style.display = "block"

  let question = results.results[index]

  questionNumber.innerText = "Question " + (index + 1)
  
  questionText.innerHTML = question.question
  
  let options = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5)

  options.forEach((option, idx) => {
    
    const input = document.getElementById("input" + (idx + 1));
    const label = document.getElementById("label" + (idx + 1));

    input.setAttribute("name", "question-" + index)
    input.setAttribute("value", option)

    label.innerHTML = option
  })
}

function checkAnswer() {
  let selectedOption = document.querySelector('input[name="question-' + currentQuestionIndex + '"]:checked')
  if (!selectedOption) {
    resultContainer.innerText = "Please select an answer."
    return
  }

  let answer = selectedOption.value
  let question = results.results[currentQuestionIndex]
  if (answer === question.correct_answer) {
    resultContainer.innerText = "Correct!"
    correctAnswers++
  } else {
    resultContainer.innerText = "Incorrect. The correct answer is: " + question.correct_answer
  }

  currentQuestionIndex++
  if (currentQuestionIndex >= results.results.length) {
    score.innerText = "You got " + correctAnswers + " out of " + results.results.length + " questions correct!"
    restartButton.style.display = "block"
    score.style.display = 'block'
    submitButton.style.display = 'none'
  } else {
    questionContainer.innerHTML = ""
    renderQuestion(currentQuestionIndex)
  }
}

function restartQuiz() {
  currentQuestionIndex = 0
  correctAnswers = 0
  questionContainer.innerHTML = ""
  resultContainer.innerText = ""
  restartButton.style.display = "none"
  submitButton.style.display = "block"
  score.style.display = 'none'
  
  // Fetch new questions from the API
  const newResults = JSON.parse(httpGet("https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple"))
  results.results = newResults.results
  
  renderQuestion(currentQuestionIndex)
}

function submitAnswer() {
  checkAnswer()
}

submitButton.addEventListener("click", submitAnswer)
restartButton.addEventListener("click", restartQuiz)

startButton.addEventListener("click", () => {
  startButton.style.display = "none"
  submitButton.style.display = "block"
  renderQuestion(currentQuestionIndex)
})
