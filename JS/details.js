document.addEventListener("DOMContentLoaded", showProductDetails);

const url = "https://668d7a4f099db4c579f3174e.mockapi.io/products";

async function showProductDetails() {
  const urlSearchParam = new URLSearchParams(window.location.search);
  const productId = urlSearchParam.get("id");

  const response = await fetch(`${url}/${productId}`);
  const product = await response.json();

  document.querySelector(".main").innerHTML = `
    <div class="details-card flex-col">
     <h2 class="padding-15">${product.name}</h2>
     <div class="pic">
       <img src="../${product.imageUrl}"/>
       <p class="card-price padding-15">${product.price} RON</p>
      </div>
      <div class="cart-option padding-15">
       <select>
         <option>S</option>
         <option>M</option>
         <option>L</option>
       </select>
       <button class="add-to-cart" data-id=${product.id}>Adauga in cos</button>
      </div>
      <h4 class="padding-15">${product.details}</h4>
    </div>
  `;
}
