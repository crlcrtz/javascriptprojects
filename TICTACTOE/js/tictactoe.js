// Keeps track of whose turn it is
let activePlayer = 'X';

// Stores the moves made (e.g., "0X", "4O")
let selectedSquares = [];

// ===== CORE GAMEPLAY =====
function placeXOrO(squareNumber) {
  // Prevent selecting an already-selected square
  if (!selectedSquares.some(el => el.includes(squareNumber))) {
    const selected = document.getElementById(squareNumber);

    // Place the image for the active player
    selected.style.backgroundImage = `url("images/${activePlayer}.png")`;

    // Track move
    selectedSquares.push(squareNumber + activePlayer);

    // Play placement audio
    audio('./media/place.mp3');

    // Check if someone won or tied
    checkWinConditions();

    // Toggle player
    activePlayer = (activePlayer === 'X') ? 'O' : 'X';

    // If it's the computer's turn, run it after a short delay
    if (activePlayer === 'O') {
      disableClick();
      setTimeout(() => { computersTurn(); }, 1000);
    }

    return true; // Needed for computersTurn loop
  }
  return false;
}

// Computer picks a random open square (beatable)
function computersTurn() {
  let availableSquares = [];

  // Collect all empty squares
  for (let i = 0; i < 9; i++) {
    if (!selectedSquares.some(el => el.includes(i))) {
      availableSquares.push(i);
    }
  }

  // Pick a random square
  if (availableSquares.length > 0) {
    let randomIndex = Math.floor(Math.random() * availableSquares.length);
    placeXOrO(availableSquares[randomIndex]);
  }

  enableClick();
}

// ===== WIN / TIE CHECKING =====
function checkWinConditions() {
  // Helper to check if 3 values exist in selectedSquares
  function arrayIncludes(a, b, c) {
    const x = selectedSquares.includes(a);
    const y = selectedSquares.includes(b);
    const z = selectedSquares.includes(c);
    return x && y && z;
  }

  // X win conditions
  if (arrayIncludes('0X', '1X', '2X')) { return win('X', 50, 100, 558, 100); }
  else if (arrayIncludes('3X', '4X', '5X')) { return win('X', 50, 304, 558, 304); }
  else if (arrayIncludes('6X', '7X', '8X')) { return win('X', 50, 508, 558, 508); }
  else if (arrayIncludes('0X', '3X', '6X')) { return win('X', 100, 50, 100, 558); }
  else if (arrayIncludes('1X', '4X', '7X')) { return win('X', 304, 50, 304, 558); }
  else if (arrayIncludes('2X', '5X', '8X')) { return win('X', 508, 50, 508, 558); }
  else if (arrayIncludes('6X', '4X', '2X')) { return win('X', 100, 508, 510, 90); }
  else if (arrayIncludes('0X', '4X', '8X')) { return win('X', 100, 100, 520, 520); }

  // O win conditions
  else if (arrayIncludes('0O', '1O', '2O')) { return win('O', 50, 100, 558, 100); }
  else if (arrayIncludes('3O', '4O', '5O')) { return win('O', 50, 304, 558, 304); }
  else if (arrayIncludes('6O', '7O', '8O')) { return win('O', 50, 508, 558, 508); }
  else if (arrayIncludes('0O', '3O', '6O')) { return win('O', 100, 50, 100, 558); }
  else if (arrayIncludes('1O', '4O', '7O')) { return win('O', 304, 50, 304, 558); }
  else if (arrayIncludes('2O', '5O', '8O')) { return win('O', 508, 50, 508, 558); }
  else if (arrayIncludes('6O', '4O', '2O')) { return win('O', 100, 508, 510, 90); }
  else if (arrayIncludes('0O', '4O', '8O')) { return win('O', 100, 100, 520, 520); }

  // Tie
  else if (selectedSquares.length >= 9) {
    audio('./media/tie.mp3');
    setTimeout(resetGame, 500);
  }
}

// Handle a win
function win(player, x1, y1, x2, y2) {
  disableClick();
  audio('./media/winGame.mp3');
  drawWinLine(x1, y1, x2, y2);
  setTimeout(resetGame, 1000);
  return true;
}

// ===== UTILITIES =====

// Plays an audio file
function audio(url) {
  const sound = new Audio(url);
  sound.play();
}

// Prevent clicks (used for computer turn & when game is over)
function disableClick() {
  document.body.style.pointerEvents = 'none';
}

// Re-enable clicks
function enableClick() {
  document.body.style.pointerEvents = 'auto';
}

// Draw the win line on the canvas
function drawWinLine(x1, y1, x2, y2) {
  const canvas = document.getElementById('win-lines');
  const c = canvas.getContext('2d');

  c.clearRect(0, 0, canvas.width, canvas.height);
  c.strokeStyle = 'rgba(70, 255, 33, 0.8)';
  c.lineWidth
