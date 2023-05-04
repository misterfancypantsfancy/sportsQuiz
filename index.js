$(document).ready(function() {
    var quizData;
    var currentQuestionIndex = 0;
    
    // Listen for the start button click event
    $('#start-btn').click(function() {
      // Get the quiz data from the server
      $.get('/api/data', function(data) {
        quizData = data;
        // Render the first question
        renderQuestion(quizData.results[currentQuestionIndex]);
  
        // Hide the start container and show the question container
        $('#start-container').hide();
        $('#question-container').show();
  
        // Show the submit button
        $('#submit-btn').show();
      });
    });
  
    // Listen for the submit button click event
    $('#submit-btn').click(function() {
      // Get the selected answer
      var selectedAnswer = $('input[name="answer"]:checked').val();
      var correctAnswer = quizData.results[currentQuestionIndex].correct_answer;
      
      if (selectedAnswer === correctAnswer) {
        $('#result').text('Correct!');
      } else {
        $('#result').text('Incorrect.');
      }
  
      // Move on to the next question
      currentQuestionIndex++;
      
      // Check if there are more questions
      if (currentQuestionIndex < quizData.results.length) {
        // Delay moving on to the next question for 2 seconds
        setTimeout(function() {
          renderQuestion(quizData.results[currentQuestionIndex]);
          // Clear the result message
          $('#result').empty();
        }, 2000);
      } else {
        // Show the quiz completion message
        $('#question-container').empty();
        var completionMessage = $('<p>');
        completionMessage.text('Quiz completed!');
        $('#question-container').append(completionMessage);
        
        // Hide the submit button
        $('#submit-btn').hide();
      }
    });
  });
  
  function renderQuestion(question) {
    // Clear the question container and result
    $('#question-container').empty();
    $('#result').empty();
  
    // Create the question element
    var questionElement = $('<div>');
    questionElement.addClass('question');
    questionElement.text(question.question);
    $('#question-container').append(questionElement);
  
    // Create the answer options
    var answerOptions = question.incorrect_answers.slice();
    answerOptions.push(question.correct_answer);
    answerOptions = shuffleArray(answerOptions);
  
    // Add the answer options to the question container
    for (var i = 0; i < answerOptions.length; i++) {
      var answerOptionElement = $('<div>');
      answerOptionElement.addClass('answer-option');
  
      var answerOptionInput = $('<input>');
      answerOptionInput.attr('type', 'radio');
      answerOptionInput.attr('name', 'answer');
      answerOptionInput.attr('value', answerOptions[i]);
  
      var answerOptionLabel = $('<label>');
      answerOptionLabel.text(answerOptions[i]);
  
      answerOptionElement.append(answerOptionInput);
      answerOptionElement.append(answerOptionLabel);
  
      $('#question-container').append(answerOptionElement);
    }
  }
  
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
