export function mapProductToCard(product) {
	const sizes = product.sizes;
	return `
        <div class="product-card flex-col gap-20 items-center justify-between">
         <h3 class="card-title">${product.name}</h3>
         <a href="pages/details.html?id=${product.id}"><img src=${
		product.imageUrl
	} width="200px"/></a>
         <p class="card-price bold">${product.price} RON</p>
          <div>
          <select class="option-select">
                ${product.sizes.map(
									(size) =>
										`
                    <option data-stock=${size.stock}>
                        ${size.size}
                    </option>
                    `
								)}
            </select>
          <button class="add-to-cart" data-id="${product.id}" data-name="${
		product.name
	}" data-price="${product.price}" data-image="${product.imageUrl}">
          <i class="fa-solid fa-cart-shopping"></i></button>
         </div>
         </div>
        `;
}

export function mapProductToAdminTableRow(product) {
	return `
    <tr> 
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>
            <a href="details.html?id=${product.id}">
             <img src="../${product.imageUrl}" />
            </a>
        </td>
        <td>
            <button class="edit-${product.id}">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
        </td>
                <td>
            <button class="delete-${product.id}">
                <i class="fa-solid fa-trash"></i>
            </button>
        </td>
    </tr>
    `;
}
