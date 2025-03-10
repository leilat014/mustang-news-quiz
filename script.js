const questions = [
  {
    question:
      "What was the primary reason for the San Luis Obispo locals' protest on March 5?",
    answers: [
      {
        text: "To support President Trump's executive order",
        correct: false,
      },
      {
        text: "To celebrate the modernization of federal technology",
        correct: false,
      },
      {
        text: "To oppose President Trump's executive order and financial cuts made by the Department of Government Efficiency (DOGE)",
        correct: true,
      },
      {
        text: "To promote folk music and Bob Dylan covers",
        correct: false,
      },
    ],
  },
  {
    question:
      "What was the reason given by Cal Poly for cutting the men’s and women’s swimming and diving programs?",
    answers: [
      { text: "Lack of student interest", correct: false },
      { text: "The \"rapidly evolving and changing NCAA Division I landscape\"", correct: true },
      { text: "Poor performance at the Big West Championships", correct: false },
      { text: "Budget cuts unrelated to NCAA changes", correct: false },
    ],
  },
  {
    question:
      "According to an Opinion article, what is a potential negative consequence of Cal Poly's approach to St. Fratty's Day?",
    answers: [
      { text: "A decrease in police presence", correct: false },
      { text: "A more sustainable and contained celebration", correct: false },
      { text: "A potential repeat of past issues, including police violence and property damage", correct: true },
      { text: "Increased student trust in city leadership", correct: false },
    ],
  },
  {
    question:
      "How many Cal Poly wrestlers advanced to the finals at the Pac-12 Championships?",
    answers: [
      { text: "Two", correct: false },
      { text: "Three", correct: false },
      { text: "Four", correct: false },
      { text: "Five", correct: true },
    ],
  },
  {
    question:
      "Since its founding, how many showers has Shower the People provided across San Luis Obispo?",
    answers: [
      { text: "Over 10,000 showers", correct: false },
      { text: " Over 15,000 showers", correct: false },
      { text: "Over 20,000 showers", correct: false },
      { text: "Over 25,000 showers", correct: true },
    ],
  },
  {
    question:
      "Why was the \"Morning on the Green\" music festival organized by Cal Poly and the City of San Luis Obispo?",
    answers: [
      { text: "To drive students away from the illegal street partying that has destroyed neighborhoods for over a decade", correct: true },
      { text: "To celebrate St. Patrick's Day with a large concert", correct: false },
      { text: "To raise money for university programs", correct: false },
      { text: "To showcase local EDM artists", correct: false },
    ],
  },
  {
    question:
      "What was the result of Cal Poly's Men's Basketball game against Long Beach State on March 8, 2025?",
    answers: [
      { text: "A narrow victory that did not impact their tournament chances", correct: false },
      { text: "A loss, continuing their losing streak", correct: false },
      { text: "A 83-69 win for Cal Poly, securing their spot in the Big West Championships", correct: true },
      { text: "A tie, leading to a rematch", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML =
    "You scored " + score + " out of " + questions.length + ".";
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
