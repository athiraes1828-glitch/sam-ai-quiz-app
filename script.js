// 15 Questions related to HTML, CSS, and JavaScript
const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Multi Language",
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<script>", "<css>", "<style>", "<design>"],
        answer: 2
    },
    {
        question: "Which property is used to change the background color in CSS?",
        options: ["color", "background-color", "bg-color", "canvas-color"],
        answer: 1
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<javascript>", "<js>", "<scripting>", "<script>"],
        answer: 3
    },
    {
        question: "How do you write 'Hello World' in an alert box in JavaScript?",
        options: [
            "msg('Hello World');",
            "alertBox('Hello World');",
            "alert('Hello World');",
            "msgBox('Hello World');"
        ],
        answer: 2
    },
    {
        question: "Which CSS property controls the text size?",
        options: ["font-style", "text-size", "font-size", "text-style"],
        answer: 2
    },
    {
        question: "Which of the following is correct syntax to refer to an external script called 'app.js'?",
        options: [
            "<script src='app.js'></script>",
            "<script href='app.js'></script>",
            "<script ref='app.js'></script>",
            "<script name='app.js'></script>"
        ],
        answer: 0
    },
    {
        question: "How do you create a function in JavaScript?",
        options: [
            "function:myFunction()",
            "function myFunction()",
            "create myFunction()",
            "func myFunction()"
        ],
        answer: 1
    },
    {
        question: "Which HTML attribute is used to inline styles?",
        options: ["class", "font", "styles", "style"],
        answer: 3
    },
    {
        question: "Which CSS framework or layout module is great for responsive one-dimensional layouts?",
        options: ["Flexbox", "Grid", "Float", "Table"],
        answer: 0
    },
    {
        question: "How do you write a conditional statement for executing some code if 'i' is equal to 5?",
        options: [
            "if i = 5",
            "if (i == 5)",
            "if i == 5 then",
            "if (i === 5)"
        ],
        answer: 3
    },
    {
        question: "How does a FOR loop start in JavaScript?",
        options: [
            "for (i = 0; i <= 5)",
            "for (i <= 5; i++)",
            "for (let i = 0; i <= 5; i++)",
            "for i = 1 to 5"
        ],
        answer: 2
    },
    {
        question: "What is the correct way to write a CSS comment?",
        options: [
            "// This is a comment",
            "/* This is a comment */",
            "<!-- This is a comment -->",
            "' This is a comment"
        ],
        answer: 1
    },
    {
        question: "What does the DOM stand for in JavaScript?",
        options: [
            "Document Object Model",
            "Data Oriented Module",
            "Digital Ordinance Model",
            "Desktop Object Management"
        ],
        answer: 0
    },
    {
        question: "Which operator is used to assign a value to a variable in JavaScript?",
        options: ["-", "*", "=", "x"],
        answer: 2
    }
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const questionTracker = document.getElementById("question-tracker");
const statsBar = document.getElementById("stats-bar");
const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score-display");
const reviewContainer = document.getElementById("review-container");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;
let userAnswers = [];

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        setNextQuestion();
    } else {
        showResults();
    }
});
restartBtn.addEventListener("click", startQuiz);

function startQuiz() {
    startScreen.classList.add("hide");
    resultScreen.classList.add("hide");
    quizScreen.classList.remove("hide");
    statsBar.classList.remove("hide");
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(quizData[currentQuestionIndex]);
}

function showQuestion(question) {
    questionTracker.textContent = `Question: ${currentQuestionIndex + 1}/${quizData.length}`;
    questionText.textContent = question.question;

    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("btn", "option-btn");
        button.addEventListener("click", () => selectAnswer(index));
        answerButtons.appendChild(button);
    });

    startTimer();
}

function resetState() {
    clearInterval(timer);
    timeLeft = 15;
    timeDisplay.textContent = timeLeft;
    nextBtn.classList.add("hide");
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeOut();
        }
    }, 1000);
}

function handleTimeOut() {
    const options = answerButtons.children;
    const correctIdx = quizData[currentQuestionIndex].answer;
    
    // Mark correct answer and disable options
    Array.from(options).forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === correctIdx) {
            btn.classList.add("correct");
        }
    });

    userAnswers.push({
        question: quizData[currentQuestionIndex].question,
        selected: "Timed Out",
        correct: quizData[currentQuestionIndex].options[correctIdx],
        isCorrect: false
    });

    nextBtn.classList.remove("hide");
}

function selectAnswer(selectedIndex) {
    clearInterval(timer);
    const correctIdx = quizData[currentQuestionIndex].answer;
    const options = answerButtons.children;

    userAnswers.push({
        question: quizData[currentQuestionIndex].question,
        selected: quizData[currentQuestionIndex].options[selectedIndex],
        correct: quizData[currentQuestionIndex].options[correctIdx],
        isCorrect: selectedIndex === correctIdx
    });

    if (selectedIndex === correctIdx) {
        score++;
        options[selectedIndex].classList.add("correct");
    } else {
        options[selectedIndex].classList.add("incorrect");
        options[correctIdx].classList.add("correct");
    }

    // Disable all options after selection
    Array.from(options).forEach(btn => btn.disabled = true);
    nextBtn.classList.remove("hide");
}

function showResults() {
    quizScreen.classList.add("hide");
    statsBar.classList.add("hide");
    resultScreen.classList.remove("hide");
    scoreDisplay.textContent = `Your Score: ${score} / ${quizData.length}`;

    reviewContainer.innerHTML = "";
    userAnswers.forEach((ans, index) => {
        const div = document.createElement("div");
        div.classList.add("review-item");
        div.innerHTML = `
            <p>${index + 1}. ${ans.question}</p>
            <span class="user-ans">Your Answer: ${ans.selected}</span>
            <span class="correct-ans">Correct Answer: ${ans.correct}</span>
        `;
        reviewContainer.appendChild(div);
    });
}