let gamePattern = [];
let userClickedPattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;

// detect when a keyboard key is pressed; when that happens the first time call nextsequece to start the game
$(document).on("keydown", function() {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// detect clicks on the game buttons
$(".btn").on("click", function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    console.log(userChosenColor);
    console.log("User pattern is: " + userClickedPattern);
});

// start a new sequence where the level is increased and the next color is added to the sequence
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    console.log(randomChosenColor);
    console.log("Game pattern is: " + gamePattern)
}

// sounds for color buttons
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// animation for when buttons are clicked
function animatePress(currentColor) {
    let activeButton = $("." + currentColor);
    $(activeButton).addClass("pressed");
    setTimeout(function() {
        $(activeButton).removeClass("pressed")
    }, 100);
}

// check the player's responses against the sequence and continue the game as long as correct, end it if incorrect
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong")
        let audioWrong = new Audio("sounds/wrong.mp3");
        audioWrong.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 400);
        $("#level-title").text("Game Over! Press any Key to Restart.");
        startOver();
    }
}

// start the game over on an incorrect
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

// TODO: [SGVW-5] Add a touch screen way to start in order to play on touch devices
// TODO: [SGWV-1] Add some player registration functionality
// TODO: [SGWV-2] Add some high score save functionality