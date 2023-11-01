var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var started = false;

function checkAnswer(currentLevel){

  if( gamePattern[currentLevel] === userClickedPattern[currentLevel] ){

    if(userClickedPattern.length === gamePattern.length){

      setTimeout( function(){
        nextSequence();
      }, 1000);
    
    }

  }
  else{
    
    playSound("wrong");
    
    $("body").addClass("game-over");
    
    setTimeout( function(){
      $("body").removeClass("game-over");
    }, 200);
  
    $("#level-title").text("Game Over, Press Any Key to Restart!");
  
    startOver();  
  
  }
  
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").click( function(){
  
  var userChosenColur = $(this).attr("id");
  
  userClickedPattern.push(userChosenColur);

  playSound(userChosenColur);
  animatePress(userChosenColur);

  checkAnswer(userClickedPattern.length-1);

});

$(document).keypress( function(){

  if( started === false ){
    
    $("#level-title").text("Level " + level);
    
    nextSequence();
    started = true;
  }

});

function nextSequence(){
  
  userClickedPattern = [];
  
  level++;

  $("#level-title").text("Level " + level);
  
  randomNumber = Math.floor(Math.random()*4);
  
  randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function animatePress(currentColour){
  
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function startOver(){
  
  level = 0;

  gamePattern = [];

  started = false;

}








