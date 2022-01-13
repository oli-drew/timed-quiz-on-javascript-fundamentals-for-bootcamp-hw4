"use strict";
// 10 Questions - multiple choice - 4 answers - JS objects within an array
const questions = [
  {
    question: "Q1: What is JS an abbreviation for?",
    answers: {
      a: "JavaScript",
      b: "JavaSource",
      c: "JerkSauce",
    },
    correct: "a",
  },
  {
    question: "Q2: Question Two?",
    answers: {
      a: "Answer 1",
      b: "Correct",
      c: "Answer 3",
      d: "Answer 4",
    },
    correct: "b",
  },
  {
    question: "Q3: Question Three?",
    answers: {
      a: "Correct",
      b: "Answer 2",
      c: "Answer 3",
    },
    correct: "a",
  },
  {
    question: "Q4: Question Four?",
    answers: {
      a: "Answer 1",
      b: "Answer 2",
      c: "Answer 3",
      d: "Correct",
      e: "Answer",
    },
    correct: "d",
  },
  {
    question: "Q5: Question Five?",
    answers: {
      a: "Answer 1",
      b: "Answer 2",
      c: "Correct",
      d: "Answer 4",
    },
    correct: "c",
  },
  {
    question: "Q6: Question Six?",
    answers: {
      a: "Answer 1",
      b: "Correct",
      c: "Answer 3",
      d: "Answer 4",
    },
    correct: "b",
  },
  {
    question: "Q7: Question Seven?",
    answers: {
      a: "Answer 1",
      b: "Answer 2",
      c: "Answer 3",
      d: "Correct",
    },
    correct: "d",
  },
  {
    question: "Q8: Question Eight?",
    answers: {
      a: "Answer 1",
      b: "Answer 2",
      c: "Answer 3",
      d: "Correct",
    },
    correct: "d",
  },
  {
    question: "Q9: Question Nine?",
    answers: {
      a: "Answer 1",
      b: "Correct",
      c: "Answer 3",
      d: "Answer 4",
    },
    correct: "b",
  },
  {
    question:
      "Q10: In JavaScript what number is derived by dividing negative number by zero?",
    answers: {
      a: "Answer 1",
      b: "Answer 2",
      c: "Negative Infinity",
      d: "Answer 4",
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
// Question text element
const questionText = document.querySelector("#questionText");
// Question result
const questionResult = document.querySelector("#questionResult");
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
// High scores section
const highScores = document.querySelector("#highScores");

// Timer function
const countdownTimer = (duration) => {
  timerElement.textContent = "Go!";
  timeRemaining = duration - 1;
  // Timer interval
  timerInterval = setInterval(() => {
    // Remove the danger class if present
    timerElement.classList.remove("danger");
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
  questionText.textContent = questions[questionNumber].question;
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
  timerElement.classList.add("danger");
};

// Show result and fade away
const fadeResult = (result) => {
  questionResult.textContent = result;
  questionResult.classList.add("fade-out");
  setTimeout(() => {
    questionResult.textContent = "";
    questionResult.classList.remove("fade-out");
  }, 1000);
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
  // Hide Quiz end
  addHide(quizEnd);
  // Hide high scores
  addHide(highScores);
};
// Play again button
const playAgain = document.querySelector("#playAgain");
playAgain.addEventListener("click", resetQuiz);
