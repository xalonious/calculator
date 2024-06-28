let currentDisplay = document.getElementById('current-display');
let previousDisplay = document.getElementById('previous-display');
let currentInput = '';
let operator = null;
let previousInput = '';

function clearDisplay() {
    currentInput = '';
    operator = null;
    previousInput = '';
    updateDisplay('0', '');
}

function appendNumber(number) {
    if (currentInput.includes('.') && number === '.') return;
    currentInput += number;
    updateDisplay(currentInput, previousInput !== '' ? `${previousInput} ${operator}` : '');
}

function appendOperator(op) {
    if (currentInput === '' && op === '-') {
        currentInput = '-';
        updateDisplay(currentInput, `${previousInput} ${operator}`);
        return;
    }
    if (currentInput === '') return;
    if (operator !== null) calculate();
    operator = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay('', `${previousInput} ${operator}`);
}

function calculate() {
    if (operator === null || currentInput === '') return;
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay(currentInput, '');
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || '0', previousInput !== '' ? `${previousInput} ${operator}` : '');
}

function updateDisplay(current, previous = '') {
    currentDisplay.textContent = current;
    previousDisplay.textContent = previous;
}

clearDisplay();
