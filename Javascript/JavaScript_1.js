// JavaScript_1.js

// Uses a switch statement and updates ALL elements with class "result"
// via document.getElementsByClassName().
function animalChoice() {
  const animal = document.getElementById("animal").value.toLowerCase();
  let message;

  switch (animal) {
    case "cat":
      message = "You chose Cat. Cats are independent and curious!";
      break;
    case "dog":
      message = "You chose Dog. Dogs are loyal and friendly!";
      break;
    case "bird":
      message = "You chose Bird. Birds are free and beautiful!";
      break;
    case "fish":
      message = "You chose Fish. Fish are calm and peaceful!";
      break;
    default:
      message = "Sorry, I don't have information about that animal.";
  }

  // Grab all elements with class "result"
  const resultEls = document.getElementsByClassName("result");

  // Update the first result with the main message
  if (resultEls.length > 0) {
    resultEls[0].textContent = message;
  }

  // If a second result element exists, show what the user typed
  if (resultEls.length > 1) {
    resultEls[1].textContent = `You typed: "${animal}"`;
  }
}

// Clears the text of all elements with class "result"
function clearResults() {
  const resultEls = document.getElementsByClassName("result");
  for (let i = 0; i < resultEls.length; i++) {
    resultEls[i].textContent = "";
    resultEls[i].classList.remove("highlight");
  }
}

// Toggles a highlight class on all elements with class "result"
function highlightResults() {
  const resultEls = document.getElementsByClassName("result");
  for (let i = 0; i < resultEls.length; i++) {
    resultEls[i].classList.toggle("highlight");
  }
}
