"use strict";

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var btnTitle = document.querySelector(".btn-title");
var button = document.getElementsByClassName("btn");
var gameStartEndBg = document.querySelector(".btn__container");
btnTitle.addEventListener("click", initGame);

function initGame() {
  gameStartEndBg.classList.remove("game-start-end");

  if (!started) {
    btnTitle.innerHTML = "Level" + level;
    nextSequence();
    started = true;
  }

  for (var i = 0; i < button.length; i++) {
    button[i].addEventListener("click", startGame);
  }
}

function startGame() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 500);
    }
  } else {
    playSound("wrong");

    for (var i = 0; i < button.length; i++) {
      button[i].removeEventListener("click", startGame);
    }

    gameStartEndBg.classList.add("game-over");
    setTimeout(function () {
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
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  var fade = document.getElementById(randomChosenColor);
  fade.style.opacity = "25%";
  fade.style.boxShadow = "0 0 20px white";
  setTimeout(function () {
    fade.style.opacity = "100%";
    fade.style.boxShadow = "none";
  }, 500);
  playSound(randomChosenColor);
}

function animatePress(currentColor) {
  var pressedClass = document.getElementById(currentColor);
  pressedClass.classList.add("pressed");
  setTimeout(function () {
    pressedClass.classList.remove("pressed");
  }, 200);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}