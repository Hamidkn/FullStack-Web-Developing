var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {

        //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#game-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    // console.log(userChosenColor);
    playSound(userChosenColor)
    animate(userChosenColor);
    checkAnswer(userClickPattern.length - 1);
});

function nextSequence() {
    userClickPattern = [];
    level++;


    $("#game-title").text("Level " + level);
    var randNumber = Math.floor((Math.random()) * 4);
    var randomNumber = buttonColors[randNumber];
    gamePattern.push(randomNumber);

    $("#" + randomNumber).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomNumber)


}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animate(currentcolor) {
    $("#" + currentcolor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentcolor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentlevel) {
    if (userClickPattern[currentlevel] === gamePattern[currentlevel]) {
        console.log("success");
        if (userClickPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#game-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}