/* ❤️ FLOATING HEARTS (ALL PAGES) */
const heartColors = ["#ff91c5","#ff70a6","#ff4d8f","#ff158a"];

setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 30 + 20 + "px";
  heart.style.color =
    heartColors[Math.floor(Math.random() * heartColors.length)];
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 4000);
}, 400);


/* =======================
   💘 QUIZ LOGIC (quiz.html)
   ======================= */

let quiz = [
  {
    q: "How many Valentines we didn’t celebrate together?",
    options: ["3", "4", "1"],
    correct: 1   // 4
  },
  {
    q: "How many times did we break up till now?",
    options: [
      "tends to infinity",
      "i did 1000 times but my wife won't consider",
      "we never did"
    ],
    correct: 2   // we never did
  },
  {
    q: "If you had superpowers, what would you do?",
    options: [
      "you'll see muskan 24×7 by hiding himself",
      "marry another woman",
      "will tell me face to face"
    ],
    correct: null  // no right/wrong
  }
];

let index = 0;
let score = 0;
let time = 10;
let timerInterval;

function startQuiz() {
  index = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  if (index >= quiz.length) {
    endQuiz();
    return;
  }

  document.getElementById("question").innerText = quiz[index].q;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  quiz[index].options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkQuizAnswer(i, btn);
    optionsDiv.appendChild(btn);
  });

  resetTimer();
}

function resetTimer() {
  clearInterval(timerInterval);
  time = 10;
  document.getElementById("timer").innerText = `⏳ Time left: ${time}s`;

  timerInterval = setInterval(() => {
    time--;
    document.getElementById("timer").innerText = `⏳ Time left: ${time}s`;

    if (time === 0) {
      clearInterval(timerInterval);
      index++;
      loadQuestion();
    }
  }, 1000);
}

function checkQuizAnswer(i, btn) {
  clearInterval(timerInterval);

  const correct = quiz[index].correct;
  const buttons = document.querySelectorAll("#options button");
  buttons.forEach(b => b.disabled = true);

  if (correct === null) {
    btn.classList.add("correct");
    score++;
  } else if (i === correct) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
  }

  setTimeout(() => {
    index++;
    loadQuestion();
  }, 900);
}

function endQuiz() {
  if (score >= 2) {
    window.location.href = "rose.html";
  } else {
    alert("😔 Baby, you need at least 2 correct answers. Try again!");
    startQuiz();
  }
}


/* =======================
   🌹 ROSE PAGE LOGIC
   ======================= */

const correctAnswers = [2, 1, null];
 // Lost it

function checkAnswer(qIndex, btn, optIndex) {
  const card = btn.closest(".lock-card");
  const buttons = card.querySelectorAll("button");

  const old = card.querySelector(".try-again");
  if (old) old.remove();

  if (optIndex === correctAnswers[qIndex]) {
    btn.classList.add("correct");
    document.getElementById("img"+qIndex).classList.add("show");
    buttons.forEach(b => b.disabled = true);
  } else {
    btn.classList.add("wrong");
    const msg = document.createElement("div");
    msg.className = "try-again";
    msg.innerText = "Baby 😤 try again";
    card.appendChild(msg);

    setTimeout(() => {
      btn.classList.remove("wrong");
      msg.remove();
    }, 1200);
  }
}


