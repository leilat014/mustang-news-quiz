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
        text: "o oppose President Trump's executive order and financial cuts made by the Department of Government Efficiency (DOGE)",
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
      "What is the primary purpose of United Movement's annual dance showcase, Illuminate?",
    answers: [
      { text: "To raise funds for the club's travel expenses", correct: false },
      {
        text: "To compete against other university dance teams",
        correct: false,
      },
      { text: "To recruit new members for the United Movement dance team", correct: false },
      { text: "To provide a platform for cultural clubs to share their traditions and experiences", correct: true },
    ],
  },
  {
    question:
      "According to the article, what are two key countermeasures implemented by Cal Poly and the City of San Luis Obispo to address the St. Fratty's Day block party in 2024?",
    answers: [
      { text: "Increased police enforcement and mandatory attendance at city council meetings", correct: false },
      { text: "Condemnation emails from the University President and increased fines for students", correct: false },
      { text: "An on-campus alternative event and double fines under a city safety enhancement zone", correct: true },
      { text: "Earlier start times for neighborhood parties and free shuttle services", correct: false },
    ],
  },
  {
    question:
      "What was the primary impact of President Trump's new immigration enforcement policies on the San Luis Obispo County community, according to the article?",
    answers: [
      { text: "Heightened anxiety, fear, and uncertainty, particularly among undocumented and mixed-status families", correct: true },
      { text: "Increased funding for local law enforcement", correct: false },
      { text: "A decrease in the number of immigrants living in the county", correct: false },
      { text: "A surge in local business growth due to increased community support", correct: false },
    ],
  },
  {
    question:
      "What is a significant challenge faced by international basketball players at Cal Poly, beyond the sport itself?",
    answers: [
      { text: "Difficulty in obtaining scholarships", correct: false },
      { text: "Lack of access to training facilities", correct: false },
      { text: "Adjusting to a new culture, balancing academics, and overcoming language barriers", correct: true },
      { text: "Pressure from coaches to prioritize academics over basketball", correct: false },
    ],
  },
  {
    question:
      "What is the primary concern for ShanWu's future after the current coordinators graduate?",
    answers: [
      { text: "Lack of funding for costumes and props", correct: false },
      { text: "The absence of someone to take on the leadership and training responsibilities", correct: true },
      { text: "Difficulty in securing performance venues", correct: false },
      { text: "Declining interest in traditional Chinese dance among Cal Poly students", correct: false },
    ],
  },
  {
    question:
      "What is the primary cause of the ongoing issues with SLO Transit's bus services, particularly for Cal Poly students?",
    answers: [
      { text: "Lack of student interest in using public transportation", correct: false },
      { text: "A nationwide bus driver shortage, exacerbated by low wages and funding challenges", correct: true },
      { text: "Frequent mechanical failures of the buses", correct: false },
      { text: "Poor route planning and scheduling", correct: false },
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
