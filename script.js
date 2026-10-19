const display = document.getElementById("display");

let expression = "";
let justCalculated = false;

function updateDisplay() {
  display.value = expression || "0";
}

function append(value) {
  const operators = ["+", "-", "*", "/"];

  if (justCalculated) {
    if (operators.includes(value)) {
      justCalculated = false;
    } else {
      expression = "";
      justCalculated = false;
    }
  }

  if (value === ".") {
    const currentNumber = expression.split(/[+\-*/]/).pop();

    if (currentNumber.includes(".")) return;

    if (currentNumber === "") value = "0.";
  }

  if (operators.includes(value) && expression === "" && value !== "-") {
    return;
  }

  if (
    operators.includes(value) &&
    operators.includes(expression.slice(-1))
  ) {
    expression = expression.slice(0, -1);
  }

  expression += value;
  updateDisplay();
}

function clearDisplay() {
  expression = "";
  justCalculated = false;
  updateDisplay();
}

function deleteLast() {
  expression = expression.slice(0, -1);
  justCalculated = false;
  updateDisplay();
}

function calculateExpression(input) {
  if (!input || !/^[0-9+\-*/.() ]+$/.test(input)) {
    throw new Error("Invalid expression");
  }

  // Safe arithmetic parser is preferable in production.
  const result = Function('"use strict"; return (' + input + ')')();

  if (!Number.isFinite(result)) {
    throw new Error("Invalid calculation");
  }

  return result;
}

function calculate() {
  try {
    expression = String(calculateExpression(expression));
    justCalculated = true;
    updateDisplay();
  } catch {
    display.value = "Error";
    expression = "";
    justCalculated = false;
  }
}

function percent() {
  try {
    expression = String(calculateExpression(expression) / 100);
    justCalculated = true;
    updateDisplay();
  } catch {
    display.value = "Error";
    expression = "";
    justCalculated = false;
  }
}
