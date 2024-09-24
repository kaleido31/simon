alert(
  "Computer will give you a color sequence, you need to accurately repeat that, however, keep in mind that after every level you need to hit the colors of previous levels first ... You will lose eventually ~Your's Yasir"
);
var gamePattern = [];
var userPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;
var listen = false;

$(document).on("keydown", function () {
  if (!started) {
    started = true;
    begin();
  }
});

$(document).on("touchstart", function (event) {
  event.preventDefault();
  if (!started) {
    started = true;
    begin();
  }
});

//click event
$(".btn").on ("click touchend", (event) => {
  userPlayer(event);
});

//sound playing
var playSound = (name) => {
  let audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
};

function begin() {
  listen = true;
  let randomNumber = Math.round(Math.random() * 3);
  var randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);
  $("." + randomChoosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChoosenColor);
  level++;
  $("#level-title").text("LEVEL " + level + " ... KEEP UP BHANDI");
}

// log user's entry

function userPlayer(e) {
  if (!listen) {
    return;
  }
  var userChoosenColor = e.target.id;
  userPattern.push(userChoosenColor);

  $("#" + userChoosenColor).addClass("pressed");
  setTimeout(() => {
    $("#" + userChoosenColor).removeClass("pressed");
  }, 100);
  check(userChoosenColor);
}

//compares the result of computer and user pattern

function check(userChoosenColor) {
  if (
    userPattern[userPattern.length - 1] === gamePattern[userPattern.length - 1]
  ) {
    playSound(userChoosenColor);
    if (userPattern.length === gamePattern.length) {
      listen = false;
      userPattern = [];
      setTimeout(() => {
        begin();
      }, 500);
    }
  } else {
    gameOver();
  }
}

// gameOver

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
  level = 0;
  listen = false;
  gamePattern = [];
  userPattern = [];
  started = false;
  $("#level-title").text("GAME OVER !!! PRESS A KEY... ");
  var gameOverAudio = new Audio("./sounds/wrong.mp3");
  gameOverAudio.play();
}
