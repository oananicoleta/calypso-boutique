import { getAllProducts } from "./API/product.js";
import { mapProductToCard } from "./utils/layout.js";

document.addEventListener("DOMContentLoaded", displayAllProducts);
const mainContainer = document.querySelector(".main");

async function displayAllProducts() {
  const products = await getAllProducts();

  mainContainer.innerHTML = products.map(mapProductToCard).join(" ");

  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productCard = button.closest(".product-card");
      const productId = button.getAttribute("data-id");
      const sizeSelect = productCard.querySelector(".option-select");
      const size = sizeSelect ? sizeSelect.value : null;
      const price = button.getAttribute("data-price");
      const imageUrl = button.getAttribute("data-image");
      const name = button.getAttribute("data-name");

      let cart = JSON.parse(localStorage.getItem("cart")) || {};
      if (cart[productId]) {
        cart[productId].quantity += 1;
      } else {
        cart[productId] = {
          imageUrl: imageUrl,
          name: name,
          size: size,
          quantity: 1,
          price: price,
        };
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    });
  });
}
