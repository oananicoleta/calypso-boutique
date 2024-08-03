document.addEventListener("DOMContentLoaded", showProductDetails);

const url = "https://668d7a4f099db4c579f3174e.mockapi.io/products";

async function showProductDetails() {
  const urlSearchParam = new URLSearchParams(window.location.search);
  const productID = urlSearchParam.get("id");
  const response = await fetch(`${url}/${productID}`);
  const product = await response.json();

  console.log("Product fetched:", product);

  document.querySelector(".main").innerHTML = `
    <div class="details-card flex-col">
     <h2 class="padding-15">${product.name}</h2>
     <div class="pic">
       <img src=${product.imageUrl}/>
       <p class="card-price padding-15">${product.price} RON</p>
      </div>
      <div class="cart-option padding-15">
       <select>
         <option>S</option>
         <option>M</option>
         <option>L</option>
       </select>
       <a class="buyButton">Add to cart</a>
      </div>
      <h4 class="padding-15">${product.details}</h4>
    </div>
  `;

  console.log("HTML updated");
}
