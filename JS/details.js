document.addEventListener("DOMContentLoaded", showProductDetails);

const url = "https://668d7a4f099db4c579f3174e.mockapi.io/products";

async function showProductDetails() {
  const urlSearchParam = new URLSearchParams(window.location.search);
  const productID = urlSearchParam.get("id");
  const response = await fetch(`${url}/${productID}`);
  const product = await response.json();

  document.querySelector(".main").innerHTML = `
    <div>
    <h2>${product.name}</h2>
    <img src=${product.imageUrl}/>
    <p class="card-price">${product.price} RON</p>
    <select>
    <option>S</option>
    <option>M</option>
    <option>L</option>
    </select>
    <a class="buyButton">Add to cart</a>
    <h4>${product.details}</h4>
    </div>
  `;
}
