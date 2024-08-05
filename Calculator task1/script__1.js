let display = document.getElementById("display");
let operatorDisplay = document.getElementById("operator-display");
let historyList = document.getElementById("history-list");
let historyModal = document.getElementById("history-modal");

let currentInput = "";
let currentOperator = "";
let history = [];

function appendNumber(number) {
    if (currentInput === "0") {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function setOperation(operator) {
    if (currentInput === "" && operator === "-") {
        currentInput = "-";
        updateDisplay();
        return;
    }

    if (currentOperator !== "") {
        calculate();
    }

    currentOperator = operator;
    operatorDisplay.innerText = currentOperator;
    history.push(currentInput);
    history.push(currentOperator);
    currentInput = "";
}

function appendDot() {
    if (!currentInput.includes(".")) {
        currentInput += ".";
    }
    updateDisplay();
}

function toggleSign() {
    if (currentInput.startsWith("-")) {
        currentInput = currentInput.slice(1);
    } else {
        currentInput = "-" + currentInput;
    }
    updateDisplay();
}

function calculate() {
    if (currentOperator === "") return;
    history.push(currentInput);

    let result;
    try {
        result = eval(history.join(" "));
        currentInput = result.toString();
        updateDisplay();
        addToHistory(history.join(" ") + " = " + result);
    } catch (e) {
        currentInput = "Error";
        updateDisplay();
    }

    currentOperator = "";
    operatorDisplay.innerText = "";
    history = [];
}

function clearDisplay() {
    currentInput = "";
    currentOperator = "";
    operatorDisplay.innerText = "";
    history = [];
    updateDisplay();
}

function clearLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function appendParenthesis(paren) {
    currentInput += paren;
    updateDisplay();
}

function updateDisplay() {
    display.innerText = currentInput === "" ? "0" : currentInput;
}

function addToHistory(entry) {
    let li = document.createElement("li");
    li.innerText = entry;
    historyList.appendChild(li);
}

function showHistory() {
    historyModal.style.display = "block";
}

function closeHistory() {
    historyModal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target === historyModal) {
        historyModal.style.display = "none";
    }
}