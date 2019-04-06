
var panel = $('#quiz-area');
var countStartNumber = 15;




$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});



var questions = [{
  question: "Who is leading the NBA in total points scored in the regular season?",
  answers: ["Kobe Bryant", "Kareem Abdul-Jabbar", "Karl Malone", "Michael Jordan"],
  correctAnswer: "Kareem Abdul-Jabbar",
  image:"assets/images/question1.gif"
}, {
  question: "Which team drafted Ray Allen?",
  answers: ["Denver Nuggets", "LA Lakers", "Minnesota Timberwolves", "Chicago Bulls"],
  correctAnswer: "Minnesota Timberwolves",
  image:"assets/images/question2.gif"
}, {
  question: "Which player won the most MVP's",
  answers: ["Kareem Abdul-Jabbar", "Michael Jordan", "Wilt Chamberlin", "Devin Booker"],
  correctAnswer: "Kareem Abdul-Jabbar",
  image:"assets/images/question3.gif"
}, {
  question: "Who has the most career rebounds?",
  answers: ["Wilt Chamberlin", "Karl Malone", "Shaq", "Bob Saget"],
  correctAnswer: "Wilt Chamberlin",
  image:"assets/images/question4.gif"
}, {
  question: "What coach holds the record for the most consecutive years coaching a team with a .500 record or better?",
  answers: ["Greg Popovich", "Steve Kerr", "Phil Jackson", "Eric Spoelstra"],
  correctAnswer: "Phil Jackson",
  image:"assets/images/question5.gif"
}, {
  question: "What team has the most NBA Finals appearances?",
  answers: ["Boston Celtics", "Charlotte Hornets", "LA Lakers", "San Antonio Spurs"],
  correctAnswer: "LA Lakers",
  image:"assets/images/question6.gif"
}, {
  question: "Who won the most career NBA championships as player?",
  answers: ["LeBron James", "Kobe Bryant", "Michael Jordan", "Bill Russell"],
  correctAnswer: "Bill Russell",
  image:"assets/images/question7.gif"
}, {
  question: "What player scored the most points in one game?",
  answers: ["Devin Booker", "LeBron James", "Magic Johnson", "Wilt Chamberlin"],
  correctAnswer: "Wilt Chamberlin",
  image:"assets/images/question8.gif"
}];




var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nah, fam!</h2>');
    panel.append('<h3>You should have answered: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Alright Alright Alright!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};
