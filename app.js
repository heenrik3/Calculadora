const display = document.querySelector(".calc__display");
const signals = ["/", "*", "-", "+", "."];

function clearDisplay() {
  display.textContent = 0;
}

function setDisplay(msg) {
  display.textContent = msg;
}

function getDisplay() {
  return display.textContent;
}

function evaluateExpression() {
  function eval(str) {
    return new Function("return " + str)();
  }

  const expression = getDisplay();

  try {
    const res = eval(expression);
    setDisplay(res ? res : 0);
  } catch (e) {
    alert("Algo errado com os dados inseridos. Tente novamente.");
  }
}

function tryConcat(newChar) {
  const expression = getDisplay();
  const lastChar = expression.slice(-1);

  if (!Number.isInteger(+newChar)) {
    if (signals.includes(lastChar)) {
      let newExpression = expression.slice(0, expression.length - 1);
      newExpression += newChar;

      setDisplay(newExpression);
      return;
    }
  }

  display.textContent =
    display.textContent != 0 ? display.textContent + newChar : newChar;
}

function resolve(char) {
  switch (char) {
    case "C":
      clearDisplay();
      break;
    case "=":
      evaluateExpression();
      break;
    default:
      tryConcat(char);
      break;
  }
}

document.querySelector(".calc").addEventListener("click", (e) => {
  const btn = e.target.closest(".calc__btn");
  if (!btn) return;

  const char = btn.textContent;

  resolve(char);
});

document.querySelector(".calc").addEventListener("keydown", (e) => {
  e.preventDefault();

  let character = undefined;

  if (e.key === "Esc" || e.key === "Backspace") character = "C";
  else if (e.key === "Enter") character = "=";
  else if (e.key === ",") character = ".";
  else if (Number.isInteger(+e.key)) character = e.key;
  else if (signals.includes(e.key)) character = e.key;

  if (character) resolve(character);
});

document.querySelector(".calc__btn").focus();
