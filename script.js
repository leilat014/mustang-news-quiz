const questions = [
  {
    question:
      "What is a requirement for individuals to participate in the Rotating Overnight Safe Parking Pilot Program?",
    answers: [
      {
        text: " Must own a registered vehicle in San Luis Obispo",
        correct: false,
      },
      {
        text: " Must have a referral from a faith-based organization",
        correct: false,
      },
      {
        text: "Must be registered with the 40 Prado Homeless Services Center for at least 30 days",
        correct: true,
      },
      {
        text: "Must be a resident of San Luis Obispo for over a year",
        correct: false,
      },
    ],
  },
  {
    question:
      "What specific data do the accelerometers in Cal Poly's GPS collars for cattle measure?",
    answers: [
      { text: " Distance traveled and speed", correct: false },
      {
        text: "Vertical, horizontal movement, and head position",
        correct: true,
      },
      { text: "Heart rate and body temperature", correct: false },
      { text: "Muscle contractions and hydration levels", correct: false },
    ],
  },
  {
    question:
      "What is the name of the former business whose sign was restored and placed on a parking garage in San Luis Obispo’s Chinatown?",
    answers: [
      { text: "Mee Heng Low", correct: false },
      { text: "Shanghai Low", correct: false },
      { text: " Ah Louis Store", correct: false },
      { text: "Chong's homemade candies", correct: true },
    ],
  },
  {
    question:
      "Which Cal Poly wrestler secured a victory with a pin in the match against Southern Illinois University Edwardsville?",
    answers: [
      { text: "Koda Holeman", correct: false },
      { text: "Chance Lamer", correct: false },
      { text: "Cash Stewart", correct: true },
      { text: "Luka Wicks", correct: false },
    ],
  },
  {
    question:
      "What specific item purchased at the benefit concert for LA wildfire relief efforts contributed to the fundraising?",
    answers: [
      { text: "Wildfire Resilience Straight Bourbon", correct: true },
      { text: "Event T-shirts", correct: false },
      { text: "Food from the restaurant", correct: false },
      { text: "Raffle tickets", correct: false },
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
