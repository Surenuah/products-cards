import { fetchProducts, deleteProduct } from './api/products.js';
import { truncateDescription } from './constants/BaseConstants.js';

let allProducts = [];
let displayedCount = 0;

const productsCards = document.querySelector('.products__cards');
const showMoreBtn = document.querySelector('.products__show-more-btn');

function updateShowMoreButton() {
	showMoreBtn.style.display =
		displayedCount < allProducts.length ? 'block' : 'none';
}

function createProductCard(product) {
	const productsCard = document.createElement('div');
	productsCard.classList.add('products__card');
	productsCard.setAttribute('data-id', product.id);

	productsCard.innerHTML = `
        <img class="products__card-img" src="${product.image}" alt="${
		product.title
	}" />
        <h3 class="products__card-title">${product.title}</h3>
        <span class="products__card-desc">${truncateDescription(
					product.description
				)}</span>
        <span class="products__card-price">${Math.round(product.price)} $</span>
        <button class="products__card-delete-btn" data-id="${
					product.id
				}">Удалить</button>
    `;

	const deleteButton = productsCard.querySelector('.products__card-delete-btn');
	deleteButton.addEventListener('click', () =>
		deleteProductById(product.id, productsCard)
	);

	return productsCard;
}

function displayProducts(products) {
	const limitedProducts = products.slice(displayedCount, displayedCount + 4);

	limitedProducts.forEach(product => {
		const productsCard = createProductCard(product);
		productsCards.appendChild(productsCard);
	});

	displayedCount += limitedProducts.length;

	updateShowMoreButton();
}

const deleteProductById = async (productId, productCardElement) => {
	await deleteProduct(productId);

	productsCards.removeChild(productCardElement);
	allProducts = allProducts.filter(product => product.id !== productId);

	displayedCount--;

	if (displayedCount < allProducts.length) {
		const nextProduct = allProducts[displayedCount];
		const newProductCard = createProductCard(nextProduct);
		productsCards.appendChild(newProductCard);
		displayedCount++;
	}

	updateShowMoreButton();
};

showMoreBtn.addEventListener('click', () => displayProducts(allProducts));

document.addEventListener('DOMContentLoaded', async () => {
	allProducts = await fetchProducts();
	displayProducts(allProducts);
});
