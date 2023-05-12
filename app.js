
function httpGet(theUrl) {
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open("GET", theUrl, false)
  xmlHttp.send()
  return xmlHttp.responseText
}

const results = JSON.parse(httpGet("https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple"))

const questionContainer = document.getElementById("question-container")
const submitButton = document.getElementById("submit-btn")
const resultContainer = document.getElementById("result")
const restartButton = document.getElementById("restart-btn")
const score = document.getElementById("score")

let currentQuestionIndex = 0
let correctAnswers = 0

function renderQuestion(index) {
  questionContainer.style.display = "block"

  let question = results.results[index]

  let questionDiv = document.createElement("div")
  questionDiv.classList.add("question")

  let questionNumber = document.createElement("p")
  questionNumber.innerText = "Question " + (index + 1)
  questionNumber.classList.add("question-number")

  let questionText = document.createElement("p")
  questionText.innerHTML = question.question
  questionText.classList.add("question-text")

  let optionsDiv = document.createElement("div")
  optionsDiv.classList.add("options")

  let options = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5)

  options.forEach((option) => {
    let optionDiv = document.createElement("div")
    optionDiv.classList.add("option")

    let input = document.createElement("input")
    input.setAttribute("type", "radio")
    input.setAttribute("name", "question-" + index)
    input.setAttribute("value", option)

    let label = document.createElement("label")
    label.innerHTML = option

    optionDiv.appendChild(input)
    optionDiv.appendChild(label)
    optionsDiv.appendChild(optionDiv)
  })

  questionDiv.appendChild(questionNumber)
  questionDiv.appendChild(questionText)
  questionDiv.appendChild(optionsDiv)

  questionContainer.appendChild(questionDiv)
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
  renderQuestion(currentQuestionIndex)
}

function submitAnswer() {
  checkAnswer()
}

submitButton.addEventListener("click", submitAnswer)
restartButton.addEventListener("click", restartQuiz)

let startButton = document.getElementById("start-btn")
startButton.addEventListener("click", () => {
  startButton.style.display = "none"
  submitButton.style.display = "block"
  renderQuestion(currentQuestionIndex)
})
