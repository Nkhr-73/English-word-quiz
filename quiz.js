<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>クイズ回答</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<h1>クイズに挑戦</h1>

<section id="quiz">
  <h2 id="qText"></h2>

  <div id="answers"></div>

  <input id="userInput" style="display:none;">
  <br><br>

  <button id="decideBtn" onclick="check()">決定</button>
  <p id="result"></p>
</section>

<button onclick="location.href='index.html'">ホームに戻る</button>

<script src="quiz.js"></script>
</body>
</html>
let questions = JSON.parse(localStorage.getItem("quizData")) || [];
let current = 0;

if (questions.length === 0) {
  alert("問題がありません");
}

showQuestion();

function showQuestion() {
  const q = questions[current];
  document.getElementById("qText").textContent = q.q;
  document.getElementById("result").textContent = "";

  const answers = document.getElementById("answers");
  const userInput = document.getElementById("userInput");
  const decideBtn = document.getElementById("decideBtn");

  answers.innerHTML = "";
  userInput.style.display = "none";
  decideBtn.style.display = "none";

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
    decideBtn.style.display = "inline-block";
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
    document.getElementById("decideBtn").style.display = "none";
  }
}

