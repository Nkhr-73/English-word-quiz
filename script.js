let questions = JSON.parse(localStorage.getItem("quizData")) || [];

const typeSelect = document.getElementById("type");
const choiceArea = document.getElementById("choiceArea");
const inputArea = document.getElementById("inputArea");
const count = document.getElementById("count");

count.textContent = `保存中の問題数：${questions.length}`;

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

  saveQuiz();
  count.textContent = `保存中の問題数：${questions.length}`;
}

function saveQuiz() {
  localStorage.setItem("quizData", JSON.stringify(questions));
  alert("保存しました");
}

function clearQuiz() {
  if (!confirm("全部消すけどいい？")) return;
  localStorage.removeItem("quizData");
  questions = [];
  location.reload();
}
