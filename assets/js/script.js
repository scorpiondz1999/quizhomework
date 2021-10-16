var quizQuestions = document.getElementById("quiz-questions");
var timer = document.getElementById("timer");
var btnStart = document.getElementById("btn-start");
var timecounter = document.getElementById("timecounter");
var titleitem = document.getElementById("title-item");
var nextQuestions;
var questionanswers = document.getElementById("question-answers");
var myScore = document.getElementById("score");
var btnScore = document.getElementById("btnScore");
var currentindex = 0;
var score = 0;
var count = 75;

var info = document.getElementById("info");
// var addscore = document.getElementById("addscore");
// var submitresult = document.getElementById("submitresult");
var allScores = [];
var storedScores = JSON.parse(localStorage.getItem("userData"));
var highScoresArea = document.querySelector("#highScoresList");
var backBtn = document.querySelector("#backButton");
var clearBtn = document.querySelector("#clearScores");

var sortedScores = [];

var responseText = document.getElementById("responseText");
var response = document.getElementById("response");

var showdiv = document.getElementById("showdiv");
var hidediv = document.getElementById("hidediv");
var divscore = document.getElementById("divscore");

showdiv.addEventListener("click", function () {
  showdiv.className = "hidescore";
  divscore.className = "hidescore";
  hidediv.className = "showscore";
});

hidediv.addEventListener("click", function () {
  showdiv.className = "showscore";
  divscore.className = "showscore";
  hidediv.className = "hidescore";
});

backBtn.addEventListener("click", function () {
  location.href = "index.html";
});

clearBtn.addEventListener("click", function () {
  highScoresArea.innerHTML = "";
  window.localStorage.clear();
});
//Quiz questions
var questions = [
  {
    title: "What does “www” stand for in a website browser?:---",
    choices: [
      "world wide web",
      "world with web",
      "when web work",
      "none of the above",
    ],
    answer: "world wide web",
  },
  {
    title: "Which country invented ice cream?:---",
    choices: ["united states", "spain", "china", "australia"],
    answer: "china",
  },
  {
    title: "what is the biggest country in africa:---",
    choices: ["egypt", "kynia", "south africa", "algeria"],
    answer: "algeria",
  },
  {
    title: "How many teeth does an adult human have ",
    choices: ["18", "24", "32", "30"],
    answer: "32",
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:---",
    choices: ["JavaScript", "terminal/bash", "alerts", "console.log"],
    answer: "console.log",
  },
];
btnStart.addEventListener("click", starQuiz);

function starQuiz() {
  if (storedScores !== null) {
    allScores = storedScores;
  }
  info.classList.add("d-none");
  btnStart.classList.add("d-none");
  timecounter.classList.remove("d-none");
  quizQuestions.classList.remove("d-none");
  nextQuestions = questions[currentindex];

  displayQuestion(nextQuestions);

  gametime();
}
btnScore.addEventListener("click", function () {
  let name = document.getElementById("inputScore").value;
  scorePage(name, count);
});
// Time set

function gametime() {
  var timeinterval = setInterval(function () {
    timer.innerText = count;
    if (count > 0) {
      count--;
    } else {
      endgame();
    }
  }, 1000);
}

function scorePage(a, b) {
  var userData = {
    inits: a,
    userScore: b,
  };
  allScores.push(userData);
//save in local storage
  localStorage.setItem("userData", JSON.stringify(allScores));
  showdiv.className = "hidescore";
  divscore.className = "showscore";
  hidediv.className = "hidescore";
}

function displayQuestion(question) {
  titleitem.innerText = question.title;
  question.choices.forEach((element) => {
    var button = document.createElement("button");
    button.className = "btn-primary btn-block text-left btn-answers";
    button.innerText = element;
    // questionanswers.innerHTML=""
    questionanswers.appendChild(button);
    button.addEventListener("click", displaynextQuestion);
  });
}

function displaynextQuestion(e) {
  currentindex++;
  if (currentindex < questions.length) {
    var response = false;
    if (e.target.innerText == nextQuestions.answer) {
      response = true;
    }
    correction(response);
    questionanswers.innerHTML = "";
    nextQuestions = questions[currentindex];
    displayQuestion(nextQuestions);
  } else {
    endgame();
  }
}
function correction(r) {
  response.classList.remove("d-none");
  if (r) {
    responseText.innerText = "Good";
    responseText.classList.remove("color-resp-text-wrong");
    responseText.classList.add("color-resp-text-good");
  } else {
    responseText.innerText = "Wrong";
    responseText.classList.add("color-resp-text-wrong");
    responseText.classList.remove("color-resp-text-good");
    count = count - 15;
    timer.innerHTML = count;
  }
  setTimeout(function () {
    responseText.innerText = "";
  }, 3000);
}
function endgame() {
  // btnStart.classList.add("d-none")
  myScore.innerText = "Your score is : " + count;
  addscore.classList.remove("d-none");
  timecounter.classList.add("d-none");
  quizQuestions.classList.add("d-none");
  addscore.classList.remove("d-none");
}

function displayScores() {
  if (storedScores !== null) {
    var scoreList = document.createElement("ol");
    scoreList.className = "scoreListClass";
    
    for (var i = 0; i < storedScores.length; i++) {
      var initials = storedScores[i].inits;
      var scores = storedScores[i].userScore;
      var scoreEntry = document.createElement("li");
      scoreEntry.innerHTML = initials + " : " + scores;
      scoreList.appendChild(scoreEntry);
    }
    highScoresArea.appendChild(scoreList);
  }
}



displayScores();
