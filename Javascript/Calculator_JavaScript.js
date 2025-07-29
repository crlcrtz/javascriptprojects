// Select the display and button container
const screen = document.querySelector('.calculator-screen');
const keys = document.querySelector('.calculator-keys');

// Calculator state variables
let currentInput = '0';
let previousInput = '';
let operator = null;

// Update the calculator screen
function updateScreen() {
  screen.value = currentInput;
}

// Handle numeric input
function handleNumber(num) {
  if (currentInput === '0' || currentInput === 'Error') {
    currentInput = num;
  } else {
    currentInput += num;
  }
}

// Handle operator input
function handleOperator(op) {
  if (operator !== null && previousInput !== '') {
    calculate();
  }
  previousInput = currentInput;
  currentInput = '';
  operator = op;
}

// Perform calculation
function calculate() {
  if (operator === null || previousInput === '' || currentInput === '') {
    return; // Ignore if incomplete
  }

  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  let result = 0;

  if (isNaN(prev) || isNaN(current)) {
    currentInput = 'Error';
    return;
  }

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = current !== 0 ? prev / current : 'Error';
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = '';
}

// Clear all input
function handleClear() {
  currentInput = '0';
  previousInput = '';
  operator = null;
}

// Handle decimal point
function handleDecimal() {
  if (!currentInput.includes('.')) {
    currentInput += '.';
  }
}

// Event delegation to handle all button clicks
keys.addEventListener('click', (event) => {
  const target = event.target;
  const value = target.value;

  if (!target.matches('button')) return;

  switch (true) {
    case target.classList.contains('operator'):
      handleOperator(value);
      break;
    case target.classList.contains('decimal'):
      handleDecimal();
      break;
    case target.classList.contains('all-clear'):
      handleClear();
      break;
    case target.classList.contains('equal-sign'):
      calculate();
      break;
    default:
      handleNumber(value);
  }

  updateScreen();
});
