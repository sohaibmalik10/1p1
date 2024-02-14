// alert("welcome");

var buttonColours = ["red", "blue", "green", "yellow"]; // creating color array

var gamePattern = [];

var userClickedPattern = []; //new empty array with name
//2. Create a new variable called level and start at level 0.
var level = 0;
//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("level" + level);
    nextSequence();
    started = true;
  }
});

//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //   console.log(userClickedPattern);
  playSound(userChosenColour); //1. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});
//4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 100);
    }
  } else {
    console.log("wrong");
    //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
    playSound("wrong");
    //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("game-over,press any key to start");
    startOver();
  }
}
//1. Inside game.js create a new function called nextSequence()
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  //level
  var level = 0;
  //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;
  //5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  gamePattern.push(randomChosenColour);

  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  //4. Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  playSound(randomChosenColour);
}

//3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//1. Create a new function called animatePress(), it should take a single input parameter called currentColour.

function animatePress(currentColor) {
  //2. Use jQuery to add this pressed class to the button that gets cliced inside animatePress().
  $("#" + currentColor).addClass("pressed");
  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function moveCharacter(buttonId) {
  // Get the character and button elements
  var character = document.getElementById('character');
  var button = document.getElementById(buttonId);

  // Get the button's position
  var buttonRect = button.getBoundingClientRect();

  // Calculate the distance to move the character towards the button
  var deltaX = buttonRect.left - character.offsetLeft;
  var deltaY = buttonRect.top - character.offsetTop;

  // Apply the translation to move the character towards the button
  character.classList.add('move');
  character.style.transform = 'translate(' + deltaX + 'px, ' + deltaY + 'px)';

  // Reset the character's position after a delay
  setTimeout(function () {
    character.style.transform = 'translate(0, 0)';
    // Remove the 'move' class to reset the animation
    character.classList.remove('move');

    // Show the game over image
    showGameOverImage(buttonRect.left, buttonRect.top);
  }, 1000);
}


function showGameOverImage() {
  var gameOverImage = document.getElementById("gameOverImage");
  gameOverImage.style.display = "block";

  setTimeout(function () {
    gameOverImage.style.display = "none";
  }, 1000);
}

function moveGameOverImage(event) {
  var gameOverImage = document.getElementById("gameOverImage");

  // Get the mouse click position
  var newTop = event.clientY;
  var newLeft = event.clientX;

  gameOverImage.style.top = newTop + "px";
  gameOverImage.style.left = newLeft + "px";
}
