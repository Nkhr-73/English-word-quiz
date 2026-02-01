let quizzes = [];
let current = 0;

/* 起動時 */
window.onload = () => {
  const saved = localStorage.getItem("quizData");

  if (!saved) {
    showMessage("クイズが保存されていません");
    return;
  }

  try {
    quizzes = JSON.parse(saved);
  } catch {
    showMessage("クイズデータが壊れています");
    return;
  }

  if (!Array.isArray(quizzes) || quizzes.length === 0) {
    showMessage("クイズがありません");
    return;
  }

  current = 0;
  showQuiz();
};

/* 表示 */
function showQuiz() {
  const area = document.getElementById("quiz-area");
  const nextBtn = document.getElementById("nextBtn");
  nextBtn.style.display = "none";

  const q = quizzes[current];

  if (!q || !q.type || !q.question) {
    area.innerHTML = "<p>問題データが不正です</p>";
    return;
  }

  /* 選択式 */
  if (q.type === "choice") {
    area.innerHTML = `
      <h2>Q${current + 1}. ${q.question}</h2>
      ${q.choices.map(c => `
        <button onclick="checkChoice('${c}')">${c}</button>
      `).join("")}
      <p id="result"></p>
    `;
  }

  /* 入力式 */
  if (q.type === "input") {
    area.innerHTML = `
      <h2>Q${current + 1}. ${q.question}</h2>
      <input id="userInput">
      <button onclick="checkInput()">答える</button>
      <p id="result"></p>
    `;
  }
}

/* 選択式判定 */
function checkChoice(choice) {
  const q = quizzes[current];
  const result = document.getElementById("result");
  const nextBtn = document.getElementById("nextBtn");

  if (choice === q.answer) {
    result.textContent = "⭕ 正解";
  } else {
    result.textContent = `❌ 不正解（正解：${q.answer}）`;
  }

  nextBtn.style.display = "block";
}

/* 入力式判定 */
function checkInput() {
  const q = quizzes[current];
  const user = document.getElementById("userInput").value.trim();
  const result = document.getElementById("result");
  const nextBtn = document.getElementById("nextBtn");

  if (user === q.answer) {
    result.textContent = "⭕ 正解";
  } else {
    result.textContent = `❌ 不正解（正解：${q.answer}）`;
  }

  nextBtn.style.display = "block";
}

/* 次の問題 */
function nextQuiz() {
  current++;

  if (current >= quizzes.length) {
    showMessage("🎉 全問終了！");
    return;
  }

  showQuiz();
}

/* メッセージ表示 */
function showMessage(msg) {
  document.getElementById("quiz-area").innerHTML = `<p>${msg}</p>`;
}
