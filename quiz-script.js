
const questions = [
    {
        question: "Why did the Lokapalas request the creation of a fifth Veda from Lord Brahma?",
        answers: [
            "To teach divine beings new arts",
            "To provide a form of entertainment for gods and demons",
            "To offer a means of education that appealed to all people, including those denied the study of other Vedas",
            "To prevent wars between gods and demons"
        ],
        correctAnswer: 2
    },
    {
        question: "Which aspect of the Natya Veda did Lord Brahma NOT draw from the four Vedas?",
        answers: [
            "Speech from Rig Veda",
            "Emotion (Rasa) from Atharva Veda",
            "Dance from Sama Veda",
            "Expression from Yajur Veda"
        ],
        correctAnswer: 2
    },
    {
        question: "During the first performance of Natya, what role did the Apsaras play after the initial attempt was unsatisfactory?",
        answers: [
            "They performed the role of the audience",
            "They introduced powerful vocal chants to enhance the production",
            "They performed Kaisiki Vritti, a delicate form of expression that brought grace to the play",
            "They acted as protectors of the theater"
        ],
        correctAnswer: 2
    },
    {
        question: "What was the reason for the demons’ disruption of the first play, Asura Parajaya, performed by Bharata and his disciples?",
        answers: [
            "They were not invited to the performance",
            "The play depicted their destruction, which they found offensive",
            "They were jealous of the gods’ involvement",
            "They misunderstood the meaning of the performance"
        ],
        correctAnswer: 1
    },
    {
        question: "How did Lord Brahma justify the creation of Natya Veda to the demons after they expressed their anger?",
        answers: [
            "Natya Veda was created only for gods",
            "Natya Veda represented the actions of both gods and demons, making it a fair and inclusive art form",
            "Natya Veda was meant to portray demons in a negative light",
            "Natya Veda was a test for the gods, not for demons"
        ],
        correctAnswer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

const questionText = document.getElementById('question-text');
const questionNumber = document.getElementById('question-number');
const answerOptions = document.getElementById('answer-options');
const quizContainer = document.getElementById('quiz-container');
const quizResults = document.getElementById('quiz-results');
const scorePercentage = document.getElementById('score-percentage');
const scoreDetails = document.getElementById('score-details');
const reviewQuestions = document.getElementById('review-questions');

document.getElementById('next-button').addEventListener('click', nextQuestion);
document.getElementById('back-button').addEventListener('click', prevQuestion);

function loadQuestion(index) {
    const currentQuestion = questions[index];
    questionText.innerText = currentQuestion.question;
    questionNumber.innerText = `${index + 1} of ${questions.length}`;

    // Clear previous answer options
    answerOptions.innerHTML = '';
    
    currentQuestion.answers.forEach((answer, idx) => {
        const answerButton = document.createElement('button');
        answerButton.innerText = answer;
        answerButton.addEventListener('click', () => selectAnswer(idx));
        answerOptions.appendChild(answerButton);
    });

    updateButtons();  // Enable or disable Back/Next buttons based on the question index
}

function selectAnswer(selectedIndex) {
    userAnswers[currentQuestionIndex] = selectedIndex;
    // Highlight the selected answer
    const answerButtons = answerOptions.querySelectorAll('button');
    answerButtons.forEach((button, idx) => {
        button.classList.remove('selected-answer');
        if (idx === selectedIndex) {
            button.classList.add('selected-answer');
        }
    });
}

function nextQuestion() {
    if (userAnswers[currentQuestionIndex] === undefined) {
        alert("Please select an answer before proceeding.");
        return;
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
}

function updateButtons() {
    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');

    backButton.style.visibility = currentQuestionIndex === 0 ? 'hidden' : 'visible';

    nextButton.innerText = currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next';
}
function showResults() {
    // Hide the quiz container and show the results
    quizContainer.classList.add('quiz-hidden');
    quizResults.classList.remove('quiz-hidden');  // Remove 'quiz-hidden' to display the results

    let correctAnswers = 0;
    reviewQuestions.innerHTML = '';  // Clear previous review questions

    questions.forEach((question, idx) => {
        const reviewQuestion = document.createElement('div');
        reviewQuestion.classList.add('review-question');

        const userAnswer = userAnswers[idx];
        const isCorrect = userAnswer === question.correctAnswer;
        if (isCorrect) correctAnswers++;

        // Display question and user's answer
        reviewQuestion.innerHTML = `
            <p><strong>Question ${idx + 1}:</strong> ${question.question}</p>
            <p><strong>You Answered:</strong> <span class="${isCorrect ? 'correct-answer' : 'incorrect-answer'}">${question.answers[userAnswer]}</span></p>
            <p><strong>Correct Answer:</strong> <span class="correct-answer">${question.answers[question.correctAnswer]}</span></p>
        `;
        reviewQuestions.appendChild(reviewQuestion);
    });

    const scorePercent = (correctAnswers / questions.length) * 100;
    scorePercentage.innerText = `${scorePercent}% Correct!`;
    scoreDetails.innerText = `${correctAnswers} out of ${questions.length}`;
}
// Initial load of the first question
loadQuestion(currentQuestionIndex);