import { getProductById } from "../API/product.js";

document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTotalContainer = document.querySelector(".cart-total");

  function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    for (let id in cart) {
      const product = cart[id];
      const { stock, quantity } = product;
      const productCard = document.createElement("div");
      const descreaseDisabled = product.quantity === 1 ? "disabled" : "";
      productCard.className = `product-cart flex justify-between items-center`;
      productCard.innerHTML = `
        <div>
          <img src=../${product.imageUrl} class="cart-pic"/>
        </div>
        <span>${product.name}</span>
        <div>
          <p>${product.size} </p>
        </div>
        <div>
						<button data-id=${id} ${descreaseDisabled} class="decrease">-</button>
						<span>${product.quantity}</span>
						<button data-id=${id} ${
        Number(stock) === quantity ? "disabled" : ""
      } class="increase">+</button>
            	</div>
        <span>${product.price * product.quantity} RON</span>
        <button data-id=${id} class="delete">Sterge</button>
      `;

      total = total + product.price * product.quantity;
      cartTotalContainer.innerHTML = `Total: ${total} RON`;
      cartTotalContainer.className = `total`;
      cartItemsContainer.appendChild(productCard);
    }
    cartTotalContainer.innerHTML =
      total === 0 ? "Cosul de cumparaturi este gol" : `Total: ${total} RON`;
    cartTotalContainer.className = `total`;
  }

  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("increase")) {
      const id = e.target.getAttribute("data-id");
      const stock = Number(cart[id].stock);
      if (stock > cart[id].quantity) {
        cart[id].quantity += 1;
      }
    } else if (e.target.classList.contains("decrease")) {
      const id = e.target.getAttribute("data-id");
      cart[id].quantity -= 1;
    } else if (e.target.classList.contains("delete")) {
      const id = e.target.getAttribute("data-id");
      delete cart[id];
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  });

  updateCart();
});
