function showDiv() {
    document.querySelector("#game").style.display = "block";

    document.getElementById('question').scrollIntoView();

        var sec = 60;
        function startTimer() {
        var timer = setInterval(function(){
            sec--;
            document.getElementById('timerDisplay').innerHTML='00:'+sec;
            if (sec === 0) {
                clearInterval(timer);
                alert("Time is up!");

            
            }
            if (sec === 0) {
                document.querySelector(".choice-container").style.display = "none";
                document.querySelector(".choice-container2").style.display = "none";
                document.querySelector(".choice-container3").style.display = "none";
                document.querySelector(".choice-container4").style.display = "none";
            }
        }, 1000);
    }
    startTimer();
};

var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var scoreText = document.querySelector('#score');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0;
let questionCounter = 0;
let availableQuestions = []

let questions = [
    {
        question: "What does CSS stand for?",
        choice1: 'Computer Sheet Style',
        choice2: 'Continued Sheet Series',
        choice3: 'Cascading Style Sheets',
        choice4: 'Corporal Style Sheets',
        answer: 3,
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: '<head> tag',
        choice2: '<script> tag',
        choice3: '<body> tag',
        choice4: '<p> tag',
        answer: 2,
    },
    {
        question: "A tool for debugging in development?",
        choice1: 'clippy',
        choice2: 'Visual Studio Code',
        choice3: 'Chrome dev tools',
        choice4: 'Google',
        answer: 3,
    },
    {
        question: "What do you do before pushing to a repository?",
        choice1: 'pull',
        choice2: 'push',
        choice3: 'save',
        choice4: 'close',
        answer: 1,
    },
    {
        question: "Where will the most answers be to hard coding questions?",
        choice1: 'Google',
        choice2: 'parents',
        choice3: 'friends',
        choice4: 'teachers',
        answer: 1,
    },
]

var SCORE_POINTS = 100;
var MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return
    }

    questionCounter++
    
    var questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        var number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        acceptingAnswers = false
        var selectedChoice = e.target
        var selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()


var username = document.querySelector('#username');
var saveScoreBtn = document.querySelector('#saveScoreBtn');
var finalScore = document.querySelector('#finalScore');
var mostRecentScore = localStorage.getItem('mostRecentScore');

var highScores = JSON.parse(localStorage.getItem('highScores')) || []

var MAX_HIGH_SCORES = 5

finalScores.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    var score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')
}

var highScoresList = document.querySelector('#highScoresList')
var highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScoresList.innerHTML =
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')

