const quiz = [
  {
    q: "福岡県の県庁所在地は？",
    c: ["北九州市", "福岡市", "久留米市", "飯塚市"],
    a: 1
  },
  {
    q: "円周率に含まれない数字は？",
    c: ["1", "2", "3", "0"],
    a: 3
  }
];

let now = 0;
let score = 0;

const q = document.getElementById("question");
const choices = document.getElementById("choices");
const result = document.getElementById("result");

function showQuiz() {
  result.textContent = "";
  choices.innerHTML = "";
  q.textContent = quiz[now].q;

  quiz[now].c.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => checkAnswer(i);
    choices.appendChild(btn);
  });
}

function checkAnswer(i) {
  if (i === quiz[now].a) {
    result.textContent = "正解！";
    score++;
  } else {
    result.textContent = "不正解…";
  }
}

document.getElementById("next").onclick = () => {
  now++;
  if (now < quiz.length) {
    showQuiz();
  } else {
    q.textContent = "終了！";
    choices.innerHTML = "";
    result.textContent = `スコア：${score} / ${quiz.length}`;
  }
};

showQuiz();
