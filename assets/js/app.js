console.log("File linked!");

// Timer - 5 minutes = 300 secs
const timerStart = 30;
// Timer element
const timerEl = document.querySelector("#timer");
// Timer function
const countdownTimer = (duration, element) => {
  let timer = duration;
  let minutes;
  let seconds;
  setInterval(function () {
    // Create minutes and seconds
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    //
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    // Display the timer
    element.textContent = minutes + ":" + seconds;
    // Decrement timer
    timer--;
    // When timer reaches 0
    if (timer < 0) {
      element.textContent = "Times up!";
    }
  }, 1000);
};

countdownTimer(timerStart, timerEl);

// Button to start the quiz
const startBtn = document.querySelector("#startBtn");

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
};

// Game finishes when all questions answered or timer = 0
const gameOver = () => {
  //
};

// User is presented with their score

// User can enter initials into form to save score to leader board
const submitScore = () => {};

// Submit score button
const submitScoreBtn = document.querySelector("#submitScore");
