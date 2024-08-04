document.addEventListener("DOMContentLoaded", showProductDetails);

const url = "https://668d7a4f099db4c579f3174e.mockapi.io/products";

async function showProductDetails() {
  const urlSearchParam = new URLSearchParams(window.location.search);
  const productId = urlSearchParam.get("id");
  const response = await fetch(`${url}/${productId}`);
  const product = await response.json();

  document.querySelector(".main").innerHTML = `
    <div class="details-card flex-col">
     <h2 class="padding-15 align-center">${product.name}</h2>
     <div class="pic align-center">
       <img src="../${product.imageUrl}"/>
       
      </div>
      <p class="card-price padding-15 align-center dark-pink">${product.price} RON</p>
      <div class="cart-option padding-15 align-center">

       <select class="option-select">
         <option>S</option>
         <option>M</option>
         <option>L</option>
       </select>
       <button class="add-to-cart" data-id=${product.id}  data-name=${product.name} data-price=${product.price} data-image=${product.imageUrl}>Adauga in cos</button>
      </div>
      <h4 class="align-center padding-15">${product.details}</h4>
    </div>
  `;

  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productCard = document.querySelector(".details-card");
      const sizeSelect = productCard.querySelector(".option-select");
      const size = sizeSelect.value;
      const productId = button.getAttribute("data-id");
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
