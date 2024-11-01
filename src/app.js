import { fetchProducts } from './api/products.js';

let allProducts = [];
let displayedCount = 0;

function displayProducts(products) {
	const productContainer = document.createElement('div');
	productContainer.className = 'product-container';

	const limitedProducts = products.slice(displayedCount, displayedCount + 4);

	limitedProducts.forEach(product => {
		const productCard = document.createElement('div');
		productCard.className = 'product-card';
		productCard.innerHTML = `
            <h2>${product.title}</h2>
            <img src="${product.image}" alt="${product.title}" />
            <p>Price: $${product.price}</p>
            <p>${product.description}</p>
        `;
		productContainer.appendChild(productCard);
	});

	document.body.appendChild(productContainer);
	displayedCount += limitedProducts.length;

	if (displayedCount < products.length) {
		document.getElementById('showMoreBtn').style.display = 'block';
	} else {
		document.getElementById('showMoreBtn').style.display = 'none';
	}
}

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
