var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

//----Button to start game----//
$(document).on("keydown", function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//----Generating random colours and level up----//
function nextSequence() {

    userClickedPattern.length = 0;

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//----Taking actions on clicks----//
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
    playSound(userChosenColour);
    animatePress(userChosenColour);
});


//----Playing sound for respective colours----//
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


//----Animation of the buttons----//
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//----Verifying the answer----//
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(nextSequence(), 1000);
        }
    } else {
        playSound("wrong");
        $("body").attr("class", "game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(() => {
            $("body").attr("class", "");
        }, 200);


        startOver();
    }
}

//----Reseting game----//
function startOver() {
    level = 0;
    gamePattern.length = 0;
    started = false;
}