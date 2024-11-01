import { fetchProducts, deleteProduct } from './api/products.js';
import { truncateDescription } from './constants/BaseConstants.js';

let allProducts = [];
let displayedCount = 0;

function displayProducts(products) {
	const productContainer = document.querySelector('.products__cards');
	const showMoreBtn = document.getElementById('showMoreBtn');
	const limitedProducts = products.slice(displayedCount, displayedCount + 4);

	limitedProducts.forEach((product, index) => {
		const productCard = document.createElement('div');
		productCard.className = 'product-card';
		productCard.innerHTML = `
			<div class="product__card">
				<img class="product__card-img" src="${product.image}" alt="${product.title}" />
				<h3 class="product__card-title">${product.title}</h3>
				<span class="product__card-desc">${truncateDescription(
					product.description
				)}</span>
				<span class="product__card-price">${Math.round(product.price)} $</span>
				<button class="product__card-btn" data-index="${
					displayedCount + index
				}">Удалить</button>
			</div>
		`;

		const deleteButton = productCard.querySelector('.product__card-btn');
		deleteButton.addEventListener('click', () => deleteProductById(product.id));

		productContainer.appendChild(productCard);
	});

	displayedCount += limitedProducts.length;

	showMoreBtn.style.display =
		displayedCount < products.length ? 'block' : 'none';
}

const deleteProductById = async (productId) => {
	try {
		await deleteProduct(productId);

		allProducts = allProducts.filter(product => product.id !== productId);
		displayedCount = 0;
		displayProducts(allProducts);
	} catch (error) {
		console.error('Failed to delete product:', error);
	}
};

const loadProducts = async () => {
	try {
		allProducts = await fetchProducts();
		displayProducts(allProducts);
	} catch (error) {
		console.error('Failed to load products:', error);
	}
};

const showMoreProducts = () => {
	displayProducts(allProducts);
};

loadProducts();

document
	.getElementById('showMoreBtn')
	.addEventListener('click', showMoreProducts);
