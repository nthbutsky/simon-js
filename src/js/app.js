"use strict";

const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
const btnTitle = document.querySelector(".btn-title");
const button = document.getElementsByClassName("btn");
const gameStartEndBg = document.querySelector(".btn__container");

btnTitle.addEventListener("click", initGame);

function initGame() {
  gameStartEndBg.classList.remove("game-start-end");
  if (!started) {
    btnTitle.innerHTML = "Level" + level;
    nextSequence();
    started = true;
  }
  for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", startGame);
  }
}

function startGame() {
  let userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 500);
    }
  } else {
    playSound("wrong");
    for (let i = 0; i < button.length; i++) {
      button[i].removeEventListener("click", startGame);
    }
    gameStartEndBg.classList.add("game-over");
    setTimeout(() => {
      gameStartEndBg.classList.remove("game-over");
    }, 1000);
    gameStartEndBg.classList.add("game-start-end");
    btnTitle.innerHTML = "Game Over, Click or Tap Here to Restart";

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  btnTitle.innerHTML = "Level " + level;
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  const fade = document.getElementById(randomChosenColor);
  fade.style.opacity = "25%";
  fade.style.boxShadow = "0 0 20px white";
  setTimeout(() => {
    fade.style.opacity = "100%";
    fade.style.boxShadow = "none";
  }, 500);

  playSound(randomChosenColor);
}

function animatePress(currentColor) {
  const pressedClass = document.getElementById(currentColor);
  pressedClass.classList.add("pressed");
  setTimeout(() => {
    pressedClass.classList.remove("pressed");
  }, 200);
}

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
