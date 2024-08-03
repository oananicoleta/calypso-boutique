import { mapProductToAdminTableRow } from "../utils/layout.js";
import {
  getProductById,
  getAllProducts,
  updateProduct,
  addNewProduct,
  deleteProduct,
} from "../API/product.js";

const productsTableBody = document
  .getElementById("products-table")
  .querySelector("tbody");

document.addEventListener("DOMContentLoaded", displayAllProducts);

async function displayAllProducts() {
  const products = await getAllProducts();

  productsTableBody.innerHTML = products
    .map(mapProductToAdminTableRow)
    .join("");
}

const form = document.getElementById("product-form");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const imageUrlInput = document.getElementById("image-url");
const detailsInput = document.getElementById("details");
const colourInput = document.getElementById("colour");
const categoryInput = document.getElementById("category");
const saveProductButton = document.getElementById("save-btn");
let editMode = false;
let currentEditableProductId;

saveProductButton.addEventListener("click", saveProduct);

async function saveProduct(event) {
  event.preventDefault();

  const product = {
    name: nameInput.value,
    price: Number(priceInput.value),
    imageUrl: imageUrlInput.value,
    details: detailsInput.value,
    colour: colourInput.value,
    category: categoryInput.value,
  };

  if (editMode) {
    const editedProduct = await updateProduct(
      product,
      currentEditableProductId
    );
    if (editedProduct !== null) {
      form.reset();
      displayAllProducts();
      editMode = false;
    }
  } else {
    const newProduct = await addNewProduct(product);
    if (newProduct !== null) {
      form.reset();
      displayAllProducts();
    }
  }
}

productsTableBody.addEventListener("click", handleActions);

async function handleActions(event) {
  const className = event.target.parentElement.className;
  if (className.includes("edit")) {
    const productId = className.split("-")[1];
    editProduct(productId);
  } else if (className.includes("delete")) {
    const productId = className.split("-")[1];
    await deleteProduct(productId);
    await displayAllProducts();
  }
}

function editProduct(id) {
  getProductById(id).then((product) => {
    editMode = true;
    nameInput.value = product.name;
    priceInput.value = product.price;
    imageUrlInput.value = product.imageUrl;
    detailsInput.value = product.details;
    colourInput.value = product.colour;
    categoryInput.value = product.category;

    currentEditableProductId = product.id;
  });
}
