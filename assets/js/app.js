"use strict";
// 10 Questions - multiple choice - 4 answers - JS objects within an array
const questions = [
  {
    question: "Q1: What is JS an abbreviation for?",
    answers: {
      a: "JavaScript",
      b: "Java Source",
      c: "Just Sing",
      d: "Jeremy Slarkson",
    },
    correct: "a",
  },
  {
    question: "Q2: Question Two?",
    answers: {
      a: "Answer 1",
      b: "Answer 2",
      c: "Answer 3",
      d: "Answer 4",
    },
    correct: "b",
  },
  {
    question: "Q3: Question Three?",
    answers: {
      a: "Answer 1",
      b: "Answer 2",
      c: "Answer 3",
      d: "Answer 4",
    },
    correct: "a",
  },
  {
    question: "Q4: Question Four?",
    answers: {
      a: "Answer 1",
      b: "Answer 2",
      c: "Answer 3",
      d: "Answer 4",
    },
    correct: "d",
  },
  {
    question: "Q5: Question Five?",
    answers: {
      a: "Answer 1",
      b: "Answer 2",
      c: "Answer 3",
      d: "Answer 4",
    },
    correct: "c",
  },
  {
    question: "Q6: Question Six?",
    answers: {
      a: "Answer 1",
      b: "Answer 2",
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
      d: "Answer 4",
    },
    correct: "d",
  },
  {
    question: "Q8: Question Eight?",
    answers: {
      a: "Answer 1",
      b: "Answer 2",
      c: "Answer 3",
      d: "Answer 4",
    },
    correct: "d",
  },
  {
    question: "Q9: Question Nine?",
    answers: {
      a: "Answer 1",
      b: "Answer 2",
      c: "Answer 3",
      d: "Answer 4",
    },
    correct: "b",
  },
  {
    question: "Q10: Question Ten?",
    answers: {
      a: "Answer 1",
      b: "Answer 2",
      c: "Answer 3",
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

// Timer - 5 minutes = 300 secs
const timerStart = 300;
let timeRemaining;
// Timer element
const timerEl = document.querySelector("#timer");
// Timer function
const countdownTimer = (duration, element) => {
  timeRemaining = duration;
  element.textContent = "Go!";
  const timerInterval = setInterval(() => {
    // Create minutes and seconds
    element.textContent = new Date(timeRemaining * 1000)
      .toISOString()
      .substr(14, 5);
    // Decrement timer
    timeRemaining--;
    // When timer reaches 0
    if (timeRemaining < 0) {
      element.textContent = "Times up!";
      clearInterval(timerInterval);
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
  elementVisibility(startBtn, "hidden");
  //   Start timer
  countdownTimer(timerStart, timerEl);
  // Get the first question
  getQuestion();
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
    // Show question card
    // showElement(questionCard);
    elementVisibility(questionCard, "visible");
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
  // If question number is less than the total number of questions go to next
  if (questionNumber < totalQuestions) {
    console.log("Next question");
    // Increment score
    currentScore++;
    // Display current score
    displayCurrentScore(currentScore);
    // Increase question number
    questionNumber++;
    // Remove options
    removeOptions();
    // Get next question
    getQuestion();
  } else {
    // Add to score for last question
    currentScore++;
    // Remove answer options
    removeOptions();
    // console.log(currentScore);
    displayCurrentScore(currentScore);
    // Finish game
    gameOver();
  }
};

// Incorrect answer = time subtracted from timer (20s)
const incorrectAnswer = () => {
  //
  console.log("Wrong");
  //   Remove 20 secs from timer
  timeRemaining = timeRemaining - 20;
};

// Remove answer options
const removeOptions = () => {
  const options = document.querySelectorAll("#options button");
  options.forEach((option) => option.remove());
};

// Game finishes when all questions answered or timer = 0
const gameOver = () => {
  console.log("Game Over!");
  // Clear timer
  // clearInterval(timerInterval);
  // Hide questions
  elementVisibility(questionCard, "hidden");
  // Show final score
  finalScore(currentScore);
  // Show score submit
  elementVisibility(quizEnd, "visible");
};

// Display current score
const displayCurrentScore = (score) => {
  const currentScoreElement = document.querySelector("#currentScore");
  currentScoreElement.textContent = `Score: ${score}`;
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
  } else {
    console.log(`You must enter a name`);
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
  // sort by value
  // --- TODO --- //
  // Select the score list element
  const scoreList = document.querySelector("#scoreList");
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
};

// localStorage.clear();

// Function to hide page element
const hideElement = (element) => {
  element.style.visibility = "hidden";
};

// Function to show page element
const showElement = (element) => {
  element.style.visibility = "visible";
};

// Function to change element visibility
const elementVisibility = (element, visibility) => {
  element.style.visibility = visibility;
};

// Reset quiz
const resetQuiz = () => {
  // Enable start button
  startBtn.disabled = false;
  // Hide start button
  elementVisibility(startBtn, "visible");
  // Reset current score
  currentScore = 0;
  // Reset current question number
  questionNumber = 0;
  // Hide Quiz end
  elementVisibility(quizEnd, "hidden");
};
// View scores button
const playAgain = document.querySelector("#playAgain");
playAgain.addEventListener("click", resetQuiz);
