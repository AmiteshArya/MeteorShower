//Creating lists to be randomly filled and settings inititial meteor positions
var num1 = [];
var operation = [];
var num2 = [];
var solutions = [];
var met0X = 125;
var met0Y = -5;
var met1X = 45;
var met1Y = -25;
var met2X = 200;
var met2Y = -40;
var gameSetCount = 0;
var difficulty = 1.5;



//function to start game, returns time when called.

function playGame(){

beginGame();
solutionGen(num1,operation,num2);


}



playGame();





//fills num lists and operations list randomly within their bounds
function beginGame()
{
 
    num1 = fillList(num1, 1, 15); 
    operation = fillList(operation, 0, 2);// 0 for +, 1 for -, 2 for x
    num2 = fillList(num2, 1, 15);
  
}

//randomly fill lists within the bounds given
function fillList(list, lowerBound, upperBound)
{
  for(var i = 0; i < 15; i++)
  {
    list[i] = randomNumber(lowerBound,upperBound); 
  }
  return list;
}

//fills the solutions list using information from the previous three lists
function solutionGen(num1, operation, num2) 
{
  for(var i = 0; i < 15; i++)
  {
    if(operation[i] == 0)
    { solutions[i] = num1[i] + num2[i]; }
    else if(operation[i] == 1)
    { solutions[i] = num1[i] - num2[i]; }
    else if(operation[i] == 2)
    { solutions[i] = num1[i] * num2[i]; }
  }
}

//function to update the questions using information from the num1, num2, operation, and solutions lists.
function setGame()
{
  setText("num1Box",num1[gameSetCount]);
  setText("num2Box",num2[gameSetCount]);
  if(operation[gameSetCount] == 0)
  {
    setText("gameSymbol", "+");
  }
  else if(operation[gameSetCount] == 1)
  {
    setText("gameSymbol", "-");
  }
   if(operation[gameSetCount] == 2)
  {
    setText("gameSymbol", "x");
  }
}
//starts meteor falling when the play button is clicked.
//created by my partner Aditya
onEvent("titlePlay", "click", function( ) {
  if (getText("difficultyDropdown") == "Hard")
  {
    difficulty = 2;
  }
  else if (getText("difficultyDropdown") == "Easy")
  {
    difficulty = 1;
  }
  playSound("Mission-Impossible-Theme(full-theme).mp3", false);
  setScreen("gameScreen");
  setGame();
  skyFall(difficulty);
  });

//checks if the user's answer is correct, blinks input box border to green briefly if it is correct.


onEvent("answerInput", "input", function( ) {
 
	if(getText("answerInput") == solutions[gameSetCount])
	{
	  setText("answerInput", "");
	  setText("remainingQuestions", 14 - gameSetCount + " To Go!");
	  setProperty("answerInput","border-color","green");
	  setTimeout(function(){
	    setProperty("answerInput","border-color",rgb(192, 183, 183));
	  },500);
	  if(gameSetCount < 14)
	  {
	    gameSetCount++;
	    met0Y = -5;
	    met1Y = -25;
	    met2Y = -40;
	  setGame();
	  }
	  else
	  {
	    stopSound();
	    stopTimedLoop();
	    setScreen("congratulationScreen");
	  }
  
	  
	}
	
});

//animates meteors falling and updates their y positions
function skyFall(difficulty)
{
  timedLoop(42,function(){
  if(met0Y < 230){
  met0Y += 1.3 * difficulty;
  setPosition("meteor0",met0X, met0Y);
}
  else
  {
      setText("answerInput", "");
      stopSound();
      setScreen("gameOverScreen");
      stopTimedLoop();
  }
  });

timedLoop(42,function(){
  if(met1Y < 230){
  met1Y += 1 * difficulty;
  setPosition("meteor1",met1X, met1Y);
}});

timedLoop(42,function(){
  if(met2Y < 230){
  met2Y += 0.9 * difficulty;
  setPosition("meteor2",met2X, met2Y);
}});
}





//clears lists and resets positions and counters to prepare for a new game
function endGame()
{
  num1 = [];
  operation = [];
  solutions = [];
  num2 = [];
  gameSetCount = 0;
  met0Y = -5;
  met1Y = -25;
  met2Y = -40;
  stopTimedLoop();
  playGame();
  setText("remainingQuestions","15 To Go!");
}


//returns to titleScreen when clicked and sets up for a new game.
//created by me, Amitesh Arya
onEvent("gameOverHome", "click", function( ) {
	setScreen("titleScreen");
	endGame();
});
//returns to titleScreen when clicked and sets up for a new game.
onEvent("congratulationsHome", "click", function( ) {
	setScreen("titleScreen");
	stopTimedLoop();
	endGame();
});
//returns to titleScreen when clicked and sets up for a new game.
onEvent("instructionHome", "click", function( ) {
	setScreen("titleScreen");
});
//returns to titleScreen when clicked.
onEvent("titleInstructions", "click", function( ) {
	setScreen("instructionScreen");
});

/*
Image Sources:
City Background: https://cdna.artstation.com/p/assets/images/images/006/053/924/large/greg-bartlett-bg1-v57.jpg?1495690713
Meteors: https://lh3.googleusercontent.com/proxy/HAjNXTi0tB4EzfOBLqvNuzdk0w9hoOxR149xOEAsConkX04dSTu-bSnUmMXDphsRI9AxwE7M2YusejxHUCn3Ld7Qs0Abenrkm2g0mqz5SfNPyxR-ogxRagEkSqgzG2yOZdtBH-43VW2XRpfy0mc
Congratulations Screen Image: https://i.imgflip.com/3s5zl6.jpg
Game Over Image: https://i.ytimg.com/vi/qM5u9CF533Y/hqdefault.jpg
Instructions Image: https://i.kym-cdn.com/photos/images/original/001/063/551/b98.jpg
Title Image: https://m.media-amazon.com/images/I/717aJmcExsL._AC_SX679_.jpg
Home Button Image: https://www.reverbsf.com/wp-content/uploads/2017/04/home-logo.png

Audio Source:
Suspenseful Theme Music:https://www.youtube.com/watch?v=XAYhNHhxN0A

Created by Amitesh Arya

*/
