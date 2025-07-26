// JavaScript_2.js
// Simple client-side validation for the contact form

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const errorsBox = document.getElementById("errors");

  form.addEventListener("submit", (e) => {
    const errors = [];

    // Name: at least 2 chars
    if (nameInput.value.trim().length < 2) {
      errors.push("Name must be at least 2 characters long.");
    }

    // Email: simple regex check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
      errors.push("Please enter a valid email address.");
    }

    // Message: at least 10 chars
    if (messageInput.value.trim().length < 10) {
      errors.push("Message must be at least 10 characters long.");
    }

    // If any errors, stop submit + show them
    if (errors.length > 0) {
      e.preventDefault();
      renderErrors(errorsBox, errors);
    } else {
      // Optional: clear errors and let the form submit
      renderErrors(errorsBox, []);
    }
  });

  // (Optional) live validation feedback on blur
  [nameInput, emailInput, messageInput].forEach((el) => {
    el.addEventListener("blur", () => {
      form.dispatchEvent(new Event("submit", { cancelable: true }));
    });
  });
});

function renderErrors(container, errors) {
  container.innerHTML = "";
  if (!errors.length) return;

  const ul = document.createElement("ul");
  ul.setAttribute("role", "alert");
  errors.forEach((err) => {
    const li = document.createElement("li");
    li.textContent = err;
    ul.appendChild(li);
  });
  container.appendChild(ul);
}
