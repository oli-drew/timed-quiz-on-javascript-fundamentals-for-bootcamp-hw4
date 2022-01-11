"use strict";
// Timer - 5 minutes = 300 secs
const timerStart = 30;
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

// Local storage for leader board

// 10 Questions - multiple choice - 4 answers - JS object
const questions = {};

// Check Answer
const checkAnswer = () => {
  //
};

// Correct answer = next question
const correctAnswer = () => {
  //
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
