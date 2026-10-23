//DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const answerContainer = document.getElementById('answer-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const resultMessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart-btn');
const scoreSpan = document.getElementById('score');
const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('max-score');
const progressBar = document.getElementById('progress');

const quizQuestions = [
  {
    question: "What is the capital of France?",
      answers: [
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false },
        { text: "Paris", correct: true },
        { text: "Rome", correct: false }
      ],
    },
    {
        question: "What is 2 + 2?",
        answers: [
          { text: "3", correct: false },
          { text: "4", correct: true },
          { text: "5", correct: false },
          { text: "22", correct: false }
        ],
      },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            {text: "Earth", correct: false},
            {text: "Mars", correct: true},
            {text: "Jupiter", correct: false},
            {text: "Venus", correct: false}
        ],
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            {text: "Atlantic Ocean", correct: false},
            {text: "Indian Ocean", correct: false},
            {text: "Arctic Ocean", correct: false},
            {text: "Pacific Ocean", correct: true}
        ],
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            {text: "William Shakespeare", correct: true},
            {text: "Charles Dickens", correct: false},
            {text: "Jane Austen", correct: false},
            {text: "Mark Twain", correct: false}
        ],
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            {text: "O2", correct: false},
            {text: "H2O", correct: true},
            {text: "CO2", correct: false},
            {text: "NaCl", correct: false}
        ],
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener('click', startQuiz);
function startQuiz() {
    console.log('Quiz started');
    currentQuestionIndex = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion() {
    answersDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    const progressPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    questionText.textContent = currentQuestion.question;
    answerContainer.innerHTML = '';

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer-btn');

        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
        answerContainer.appendChild(button);
    });

}
function selectAnswer(e) {
    if (answersDisabled) return;
    answersDisabled = true;

    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';

    if (correct) {
        score++;
        scoreSpan.textContent = score;
    }

    Array.from(answerContainer.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        } else {
            button.classList.add('incorrect');
        }
    });

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    finalScoreSpan.textContent = score;
}
restartButton.addEventListener('click', restartQuiz);
function restartQuiz() {
    console.log('Quiz restarted');
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");

}
