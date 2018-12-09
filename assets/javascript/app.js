var triviaQuestions = [{
	question: "Which car has a 3 pointed star as their logo?",
	answerList: ["ACURA", "NISSAN", "AUDI", "MERCEDES"],
	answer: 3,
},{
	question: "Which company's logo symbolizes the amalgamation(coming together) in 1932 of four previously independent motor-vehicle manufacturers?",
	answerList: ["INFINITI", "AUDI", "SPYKER", "BUICK"],
	answer: 1,
},{
	question: "What company uses white and blue checker boxes as their logo which represents white/silver propeller blades spinning against a clear blue sky?",
	answerList: ["ASTON MARTIN", "VW", "BMW", "SUZUKI"],
	answer: 2,
},{
	question: "This company's founder was born under the zodiac sign of Taurus. The image associated with this sign of the zodiac is a bull, which became a part of which company's logo?",
	answerList: ["MUSTANG", "FERRARI", "JAGUAR", "LAMBORGHINI"],
	answer: 3,
},{
	question: "One of the most recognizable logos in the world, the simple prancing horse, with a background of canary yellow is a trademark symbol of which company?",
	answerList: ["FERRARI", "MUSTANG", "BUGATTI", "LAND ROVER"],
	answer: 0,
}];

var gifArray = ["mb", "audi", "bmw", "lamborghini", "ferrari"];
var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userChoice;

var messages = {
	correct: "CORRECT!",
	incorrect: "INCORRECT!",
	endTime: "OUT OF TIME!",
	finished: "COMPLETED!",
}

$("#startBtn").on("click", function(){
	$(this).hide();
	newGame();
});

$("#startOverBtn").on("click", function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$("#finalMessage").empty();
	$("#correctAnswers").empty();
	$("#incorrectAnswers").empty();
	$("#unanswered").empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	nextQuestion();
}

function nextQuestion(){
	$("#message").empty();
	$("#correctedAnswer").empty();
	$("#gif").empty();
	answered = true;
	

	$(".question").html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $("<div>");
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({"data-index": i });
		choices.addClass("thisChoice");
		$(".answerList").append(choices);
	}
	countdown();

	$(".thisChoice").on("click",function(){
		userChoice = $(this).data('index');
		clearInterval(time);
		solution();
	});
}

function countdown(){
	seconds = 30;
	$("#timeLeft").html("<h5>TIME REMAINING: " + seconds + "</h5>");
	answered = true;

	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$("#timeLeft").html("<h5>TIME REMAINING: " + seconds + "</h5>");
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		solution();
	}
}

function solution(){
	$("#currentQuestion").empty();
	$(".thisChoice").empty();
	$(".question").empty();

	var correctResponse = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var correctSelection = triviaQuestions[currentQuestion].answer;
	$("#gif").html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "500px">');
	
	if((userChoice === correctSelection) && (answered === true)){
		correctAnswer++;
		$("#message").html(messages.correct);
	} else if((userChoice != correctSelection) && (answered === true)){
		incorrectAnswer++;
		$("#message").html(messages.incorrect);
		$("#correctedAnswer").html("THE CORRECT ANSWER WAS: " + correctResponse);
	} else{
		unanswered++;
		$("#message").html(messages.endTime);
		$("#correctedAnswer").html("THE CORRECT ANSWER WAS: " + correctResponse);
		answered = true;
	}
	
	if(currentQuestion === (triviaQuestions.length-1)){
		setTimeout(results, 4000);
	} else{
		currentQuestion++;
		setTimeout(nextQuestion, 4000);
	}	
}

function results(){
	$("#timeLeft").empty();
	$("#message").empty();
	$("#correctedAnswer").empty();
	$("#gif").empty();
	$("#finalMessage").html(messages.finished);
	$("#correctAnswers").html("CORRECT ANSWERS: " + correctAnswer);
	$("#incorrectAnswers").html("INCORRECT ANSWERS: " + incorrectAnswer);
	$("#unanswered").html("NOT ANSWERED: " + unanswered);
	$("#startOverBtn").show();
	$("#startOverBtn").html("CLICK HERE TO PLAY AGAIN");
}