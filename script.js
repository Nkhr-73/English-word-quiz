let questions = [];
let current = 0;

const typeSelect = document.getElementById("type");
const choiceArea = document.getElementById("choiceArea");
const inputArea = document.getElementById("inputArea");

typeSelect.onchange = () => {
  if (typeSelect.value === "choice") {
    choiceArea.style.display = "block";
    inputArea.style.display = "none";
  } else {
    choiceArea.style.display = "none";
    inputArea.style.display = "block";
  }
};

function addQuestion() {
  const type = typeSelect.value;
  const q = document.getElementById("questionText").value;

  if (!q) return alert("問題文が空");

  if (type === "choice") {
    const choices = [...document.querySelectorAll(".choice")].map(c => c.value);
    const ansNum = document.getElementById("answerChoice").value;

    if (choices.includes("") || !ansNum) return alert("未入力あり");

    questions.push({
      type: "choice",
      q,
      choices,
      answer: choices[ansNum - 1]
    });
  } else {
    const ans = document.getElementById("answerInput").value;
    if (!ans) return alert("答えが空");

    questions.push({
      type: "input",
      q,
      answer: ans
    });
  }

  document.getElementById("count").textContent =
    `問題数：${questions.length}`;
}

function startQuiz() {
  if (questions.length === 0) return alert("問題がない");

  document.getElementById("maker").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  showQuestion();
}

function showQuestion() {
  const q = questions[current];
  document.getElementById("qText").textContent = q.q;
  document.getElementById("result").textContent = "";

  const answers = document.getElementById("answers");
  const userInput = document.getElementById("userInput");

  answers.innerHTML = "";
  userInput.style.display = "none";

  if (q.type === "choice") {
    q.choices.forEach(c => {
      const btn = document.createElement("button");
      btn.textContent = c;
      btn.onclick = () => check(c);
      answers.appendChild(btn);
    });
  } else {
    userInput.value = "";
    userInput.style.display = "block";
  }
}

function check(selected) {
  const q = questions[current];
  let correct;

  if (q.type === "choice") {
    correct = selected === q.answer;
  } else {
    const input = document.getElementById("userInput").value;
    correct = input === q.answer;
  }

  document.getElementById("result").textContent =
    correct ? "⭕ 正解！" : `❌ 不正解（答え：${q.answer}）`;

  current++;
  if (current < questions.length) {
    setTimeout(showQuestion, 1000);
  } else {
    document.getElementById("qText").textContent = "終了！";
    document.getElementById("answers").innerHTML = "";
  }
}
