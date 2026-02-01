// ===== 共通 =====
function loadQuizzes() {
  return JSON.parse(localStorage.getItem("quizzes") || "[]");
}

function saveQuizzes(quizzes) {
  localStorage.setItem("quizzes", JSON.stringify(quizzes));
}

// ===== 問題追加（make.html用）=====
function addChoiceQuestion() {
  const question = document.getElementById("q").value;
  const a = document.getElementById("a").value;
  const b = document.getElementById("b").value;
  const c = document.getElementById("c").value;
  const answer = document.getElementById("answer").value;

  if (!question || !answer) {
    alert("未入力あるぞ！");
    return;
  }

  const quizzes = loadQuizzes();
  quizzes.push({
    type: "choice",
    question,
    choices: [a, b, c],
    answer
  });

  saveQuizzes(quizzes);
  alert("問題保存した！");
}

function addInputQuestion() {
  const question = document.getElementById("iq").value;
  const answer = document.getElementById("ianswer").value;

  if (!question || !answer) {
    alert("未入力あるぞ！");
    return;
  }

  const quizzes = loadQuizzes();
  quizzes.push({
    type: "input",
    question,
    answer
  });

  saveQuizzes(quizzes);
  alert("入力式問題保存！");
}

// ===== クイズ表示（quiz.html用）=====
let current = 0;
let score = 0;
const quizzes = loadQuizzes();

function showQuiz() {
  if (quizzes.length === 0) {
    document.body.innerHTML = "<h2>問題がありません</h2>";
    return;
  }

  const q = quizzes[current];
  const area = document.getElementById("quiz-area");

  if (q.type === "choice") {
    area.innerHTML = `
      <h2>${q.question}</h2>
      ${q.choices.map(c => `
        <button onclick="checkAnswer('${c}')">${c}</button>
      `).join("")}
    `;
  } else {
    area.innerHTML = `
      <h2>${q.question}</h2>
      <input id="userAnswer">
      <button onclick="checkInput()">答える</button>
    `;
  }
}

function checkAnswer(choice) {
  if (choice === quizzes[current].answer) score++;
  next();
}

function checkInput() {
  const val = document.getElementById("userAnswer").value;
  if (val === quizzes[current].answer) score++;
  next();
}

function next() {
  current++;
  if (current >= quizzes.length) {
    document.getElementById("quiz-area").innerHTML =
      `<h2>終了！スコア ${score}/${quizzes.length}</h2>`;
  } else {
    showQuiz();
  }
}
