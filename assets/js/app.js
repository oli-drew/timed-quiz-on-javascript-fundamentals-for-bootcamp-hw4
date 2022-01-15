"use strict";
// 10 Questions - multiple choice - 4 answers - JS objects within an array
const questions = [
  {
    question: "What is JS an abbreviation for?",
    answers: {
      a: "JavaScript",
      b: "JavaSource",
      c: "JerkSauce",
    },
    correct: "a",
  },
  {
    question: "What are the variable names 'i' and 'j' most commonly used for?",
    answers: {
      a: "Letters",
      b: "Counters",
      c: "Functions",
      d: "Arrays",
    },
    correct: "b",
  },
  {
    question: "Is JavaScript used on the client-side or server-side?",
    answers: {
      a: "Both",
      b: "Client-side",
      c: "Server-side",
    },
    correct: "a",
  },
  {
    question: "Which of the options isn't a data type in JavaScript?",
    answers: {
      a: "String",
      b: "Undefined",
      c: "Number",
      d: "Float",
      e: "Boolean",
    },
    correct: "d",
  },
  {
    question:
      "What keyword does the following phrase refer to: 'the object that the function is a property of'?",
    answers: {
      a: "them",
      b: "theirs",
      c: "this",
      d: "that",
    },
    correct: "c",
  },
  {
    question:
      "Which of the comparison operators is used to compare both value and types?",
    answers: {
      a: "!=",
      b: "===",
      c: "&&",
      d: "==",
    },
    correct: "b",
  },
  {
    question:
      "What is the name given to a function that will be executed after another function gets executed?",
    answers: {
      a: "Callback",
      b: "Ringback",
    },
    correct: "a",
  },
  {
    question:
      "What is the name of the default JavaScript behaviour where all of the variable and function declarations are moved on top?",
    answers: {
      a: "Tugging",
      b: "Yanking",
      c: "Erecting",
      d: "Hoisting",
    },
    correct: "d",
  },
  {
    question:
      "Is javascript a statically typed or a dynamically typed language?",
    answers: {
      a: "Statically",
      b: "Dynamically",
    },
    correct: "b",
  },
  {
    question:
      "In JavaScript what number is derived by dividing a negative number by zero?",
    answers: {
      a: "42",
      b: "Infinity",
      c: "Negative Infinity",
      d: "Zero",
    },
    correct: "c",
  },
];

// Total number of questions. -1 because we start at zero
const totalQuestions = questions.length - 1;
// Variable to store current score
let currentScore = 0;
// Variable to track current question
let questionNumber = 0;
// Question card
const questionCard = document.querySelector("#questionCard");
// Question card footer
const cardFooter = document.querySelector("#cardFooter");
// Question text element
const questionText = document.querySelector("#questionText");
// Quiz end section
const quizEnd = document.querySelector("#quizEnd");
// Select the score list element
const scoreList = document.querySelector("#scoreList");
// Timer - 5 minutes = 300 secs
const timerStart = 300;
let timeRemaining;
// Timer element
const timerElement = document.querySelector("#timer");
// Timer interval
let timerInterval;
// Submit form
const submitScoreForm = document.querySelector("#submitScore");
// Submit success message
const submitSuccess = document.querySelector("#submitSuccess");
// High scores section
const highScores = document.querySelector("#highScores");

// Shuffle question array
const shuffleArr = (arr) => {
  arr.sort(() => 0.5 - Math.random());
};

// Timer function
const countdownTimer = (duration) => {
  timerElement.textContent = "Go!";
  timeRemaining = duration - 1;
  // Timer interval
  timerInterval = setInterval(() => {
    // Remove the danger class if present
    timerElement.classList.remove("text-danger");
    // Create minutes and seconds
    timerElement.textContent = new Date(timeRemaining * 1000)
      .toISOString()
      .substring(14, 19);
    // Decrement timer
    timeRemaining--;
    // When timer reaches 0
    if (timeRemaining < 0) {
      timerElement.textContent = "Times up!";
      // Finish game when timer reaches 0
      gameOver();
    }
  }, 1000);
};

// Start button clicked function
const startQuiz = () => {
  console.log("Start Quiz");
  // Shuffle Questions
  shuffleArr(questions);
  // Disable start button
  startBtn.disabled = true;
  // Hide start button
  toggleHide(startBtn);
  //   Start timer
  countdownTimer(timerStart);
  // Get the first question
  getQuestion();
  // Display question
  toggleHide(questionCard);
  // Display score
  displayCurrentScore(currentScore);
};
// Button to start the quiz and click event listener
const startBtn = document.querySelector("#startBtn");
startBtn.addEventListener("click", startQuiz);

// Show question and create option buttons function
const getQuestion = () => {
  // Change dom element with question
  questionText.textContent = `Q${questionNumber + 1}: ${
    questions[questionNumber].question
  }`;
  // Turns answers object keys and values into array so we can iterate over
  const answers = Object.entries(questions[questionNumber].answers);
  // Where to place option buttons
  const optionsElement = document.querySelector("#options");
  // CLear element children
  optionsElement.innerHTML = "";
  // Dynamically create option buttons
  answers.forEach(([key, value]) => {
    // Create the button  to insert
    const optionBtn = document.createElement("button");
    // Set button data-answer attribute
    optionBtn.setAttribute("data-answer", key);
    // Add class to buttons
    optionBtn.classList.add("btn", "btn-primary", "m-2");
    // Set button text
    optionBtn.textContent = value;
    // Add event listener to option button
    optionBtn.addEventListener("click", (event) => {
      let userAnswer = event.target.getAttribute("data-answer");
      console.log(userAnswer);
      checkAnswer(userAnswer);
    });
    // Append button
    optionsElement.append(optionBtn);
  });
};

// Check Answer
const checkAnswer = (answer) => {
  // Check if the submitted answer was correct
  if (answer === questions[questionNumber].correct) {
    correctAnswer();
  } else {
    incorrectAnswer();
  }
};

// Correct answer = next question
const correctAnswer = () => {
  console.log("Correct");
  // Set result to correct!
  fadeResult("Correct!");
  // If question number is less than the total number of questions go to next
  if (questionNumber < totalQuestions) {
    console.log("Next question");
    // Increment score
    currentScore++;
    // Display current score
    displayCurrentScore(currentScore);
    // Increase question number
    questionNumber++;
    // Get next question
    getQuestion();
  } else {
    // Add to score for last question
    currentScore++;
    // console.log(currentScore);
    displayCurrentScore(currentScore);
    // Finish game
    gameOver();
  }
};

// Incorrect answer = time subtracted from timer (20s)
const incorrectAnswer = () => {
  console.log("Wrong");
  // Set result to wrong!
  fadeResult("Wrong!");
  //   Remove 20 secs from timer
  timeRemaining = timeRemaining - 20;
  // Add danger class to timer
  timerElement.classList.add("text-danger");
};

// Show result and fade away
const fadeResult = (result) => {
  // If element exists remove it
  const resultExists = document.getElementById("questionResult");
  if (resultExists) {
    resultExists.remove();
  }
  // Create element
  const questionResult = document.createElement("span");
  questionResult.textContent = result;
  questionResult.id = "questionResult";
  cardFooter.append(questionResult);
  // Color depending on result
  if (result === "Correct!") {
    questionResult.classList.add("text-success");
  } else {
    questionResult.classList.add("text-danger");
  }
  // Set fade out class
  questionResult.classList.add("fade-out");
};

// Display current score
const displayCurrentScore = (score) => {
  const currentScoreElement = document.querySelector("#currentScore");
  currentScoreElement.textContent = `Score: ${score}/${questions.length}`;
};

// Game finishes when all questions answered or timer = 0
const gameOver = () => {
  console.log("Game Over!");
  // Clear timer
  clearInterval(timerInterval);
  // Hide questions
  toggleHide(questionCard);
  // Show final score
  finalScore(currentScore);
  // Show score submit
  toggleHide(quizEnd);
};

// User is presented with their score
const finalScore = (score) => {
  const finalScoreElement = document.querySelector("#finalScore");
  finalScoreElement.textContent = `You scored: ${score}/${questions.length}`;
};

// User can enter initials into form to save score to leader board
const submitScore = (e) => {
  // Prevent form submit default action
  e.preventDefault();
  // Get user input. Convert to uppercase
  const initialsElement = document.querySelector("#initials");
  // Initials value
  const initials = initialsElement.value.toUpperCase();
  // Check input is not blank
  if (initials) {
    console.log(`${initials} scored: ${currentScore}`);
    // Save the score
    addScore(initials, currentScore);
    // Clear value
    initialsElement.value = "";
  } else {
    confirm("Your initials are required");
  }
};

// Submit score button
const submitScoreBtn = document.querySelector("#submit");
submitScoreBtn.addEventListener("click", submitScore);

// Function to display high scores
const displayScores = () => {
  console.log("View scores");
  // Scores as object
  const scores = getScores();
  // Convert to an array so we can iterate and sort
  const scoresArr = Object.entries(scores);
  // Sort by players score
  scoresArr.sort((a, b) => b[1] - a[1]);
  // Remove any existing children
  scoreList.innerHTML = "";
  // Iterate over the scores and display
  scoresArr.forEach(([key, value]) => {
    // Create the list item  to insert
    const scoreItem = document.createElement("li");
    // Add list item class
    scoreItem.classList.add("list-group-item");
    // Set list item text
    scoreItem.textContent = `${key}: ${value}`;
    scoreList.append(scoreItem);
  });
  toggleHide(highScores);
};
// View scores button
const viewScores = document.querySelector("#viewScores");
viewScores.addEventListener("click", displayScores);

// Function to get previous high scores
const getScores = () => {
  const highScores = localStorage.getItem("highScores");
  // If not null
  if (highScores) {
    // Return the scores as an object
    return JSON.parse(highScores);
  } else {
    // Return empty object
    return {};
  }
};

// Function to add a high score
const addScore = (initials, score) => {
  // Players new score object
  const newScore = { [initials]: score };
  // Get the old scores object
  const prevScores = getScores();
  // Assign new score to old scores object
  const updateScores = Object.assign(prevScores, newScore);
  // Save the score to local storage
  localStorage.setItem("highScores", JSON.stringify(updateScores));
  // Hide Quiz end submit form
  toggleHide(submitScoreForm);
  // Show score submitted message
  removeHide(submitSuccess);
  // Open high scores table
  displayScores();
  // Show high scores
  removeHide(highScores);
};

// Clear high scores function
const clearScores = () => {
  localStorage.removeItem("highScores");
  scoreList.innerHTML = "";
};
// Clear scores button
const clearScoresBtn = document.querySelector("#clearScores");
clearScoresBtn.addEventListener("click", clearScores);

// Function to toggle hide class
const toggleHide = (element) => {
  element.classList.toggle("hide");
};

// Function to remove hide class
const removeHide = (element) => {
  element.classList.remove("hide");
};

// Function to add hide class
const addHide = (element) => {
  element.classList.add("hide");
};

// Reset quiz
const resetQuiz = () => {
  // Remove the last result in the footer
  cardFooter.innerHTML = "";
  // Enable start button
  startBtn.disabled = false;
  // Hide start button
  toggleHide(startBtn);
  // Reset current score
  currentScore = 0;
  // Reset current question number
  questionNumber = 0;
  // Clear timer element
  timerElement.textContent = "";
  // Unhide submit form
  removeHide(submitScoreForm);
  // Hide submit success message
  addHide(submitSuccess);
  // Hide Quiz end
  addHide(quizEnd);
  // Hide high scores
  addHide(highScores);
};
// Play again button
const playAgain = document.querySelector("#playAgain");
playAgain.addEventListener("click", resetQuiz);
