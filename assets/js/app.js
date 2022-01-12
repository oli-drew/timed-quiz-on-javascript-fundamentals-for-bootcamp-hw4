"use strict";
// 10 Questions - multiple choice - 4 answers - JS object
const questions = [
  {
    question: "Q1: Question One?",
    a: "Answer 1",
    b: "Answer 2",
    c: "Answer 3",
    d: "Answer 4",
    correct: "a",
  },
  {
    question: "Q2: Question Two?",
    a: "Answer 1",
    b: "Answer 2",
    c: "Answer 3",
    d: "Answer 4",
    correct: "b",
  },
  {
    question: "Q3: Question Three?",
    a: "Answer 1",
    b: "Answer 2",
    c: "Answer 3",
    d: "Answer 4",
    correct: "a",
  },
  {
    question: "Q4: Question Four?",
    a: "Answer 1",
    b: "Answer 2",
    c: "Answer 3",
    d: "Answer 4",
    correct: "d",
  },
  {
    question: "Q5: Question Five?",
    a: "Answer 1",
    b: "Answer 2",
    c: "Answer 3",
    d: "Answer 4",
    correct: "c",
  },
  {
    question: "Q6: Question Six?",
    a: "Answer 1",
    b: "Answer 2",
    c: "Answer 3",
    d: "Answer 4",
    correct: "b",
  },
  {
    question: "Q7: Question Seven?",
    a: "Answer 1",
    b: "Answer 2",
    c: "Answer 3",
    d: "Answer 4",
    correct: "d",
  },
  {
    question: "Q8: Question Eight?",
    a: "Answer 1",
    b: "Answer 2",
    c: "Answer 3",
    d: "Answer 4",
    correct: "d",
  },
  {
    question: "Q9: Question Nine?",
    a: "Answer 1",
    b: "Answer 2",
    c: "Answer 3",
    d: "Answer 4",
    correct: "b",
  },
  {
    question: "Q10: Question Ten?",
    a: "Answer 1",
    b: "Answer 2",
    c: "Answer 3",
    d: "Answer 4",
    correct: "c",
  },
];

// Total number of questions
const totalQuestions = questions.length;

// Variable to store current score
let currentScore = 0;

// Variable to track current question
let questionNumber = 0;

// Question element
const questionElement = document.querySelector("#question");

// Question options
const optionOneBtn = document.querySelector("#optionOne");
const optionTwoBtn = document.querySelector("#optionTwo");
const optionThreeBtn = document.querySelector("#optionThree");
const optionFourBtn = document.querySelector("#optionFour");

// Timer - 5 minutes = 300 secs
const timerStart = 300;
let timeRemaining;
// Timer element
const timerEl = document.querySelector("#timer");
// Timer function
const countdownTimer = (duration, element) => {
  timeRemaining = duration;
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
      gameOver();
    }
  }, 1000);
};

// Start button clicked function
const startQuiz = () => {
  console.log("Start Quiz");
  //   Start timer
  countdownTimer(timerStart, timerEl);
};

// Button to start the quiz and click event listener
const startBtn = document.querySelector("#startBtn");
startBtn.addEventListener("click", startQuiz);

// Show question function
const getQuestion = (questionNumber) => {
  // Change dom elements with question and options
  questionElement.textContent = questions[questionNumber].question;
  optionOneBtn.textContent = questions[questionNumber].a;
  optionTwoBtn.textContent = questions[questionNumber].b;
  optionThreeBtn.textContent = questions[questionNumber].c;
  optionFourBtn.textContent = questions[questionNumber].d;
};

// Check Answer
const checkAnswer = (answer, questionNumber) => {
  // Check if the submitted answer was correct
  if (answer === questions[questionNumber].correct) {
    console.log("correct");
    correctAnswer();
  } else {
    console.log("Wrong");
    incorrectAnswer();
  }
};

// Correct answer = next question
const correctAnswer = () => {
  // If question number is less than the total number of questions go to next
};

// Incorrect answer = time subtracted from timer (20s)
const incorrectAnswer = () => {
  //
  //   Remove 20 secs from timer
  timeRemaining = timeRemaining - 20;
};

// Game finishes when all questions answered or timer = 0
const gameOver = () => {
  //
  console.log("Game Over!");
};

// User is presented with their score

// User can enter initials into form to save score to leader board
const submitScore = (e) => {
  // Prevent form submit default action
  e.preventDefault();
  console.log("Score submitted");
};

// Submit score button
const submitScoreBtn = document.querySelector("#submitScore");
submitScoreBtn.addEventListener("click", submitScore);

// Function to hide page element
const hideElement = (element) => {
  element.style.display = "none";
};

// Function to show page element
const showElement = (element) => {
  element.style.display = "block";
};

// Local storage for leader board
// -> JSON object to store scores
// // -> convert to string to save to local storage
// // // ->
