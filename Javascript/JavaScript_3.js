// JavaScript_3.js
// Demonstrates reading and writing HTML5 data-* attributes via element.dataset

document.addEventListener("DOMContentLoaded", () => {
  const products = document.querySelectorAll(".product");
  const output = document.getElementById("output");
  const calcBtn = document.getElementById("calcTotal");

  // Click a product to read its data-* attributes
  products.forEach((el) => {
    el.addEventListener("click", () => {
      // Read via dataset (preferred, auto camelCases names)
      const { id, name, price, category } = el.dataset;

      // Example of writing a data-* attribute from JS
      el.dataset.clicked = "true";

      output.textContent =
        `Clicked product → ID: ${id}, Name: ${name}, Price: $${price}, Category: ${category}`;
    });
  });

  // Sum all products in the "peripherals" category using their data-price
  calcBtn.addEventListener("click", () => {
    const allProducts = document.querySelectorAll(".product");
    let total = 0;

    allProducts.forEach((p) => {
      if (p.dataset.category === "peripherals") {
        total += parseFloat(p.dataset.price);
      }
    });

    output.textContent = `Total price of peripherals: $${total.toFixed(2)}`;
  });
});
