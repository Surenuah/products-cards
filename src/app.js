import { fetchProducts } from './api/products.js';

function displayProducts(products) {
	const productContainer = document.createElement('div');
	productContainer.className = 'product-container';

	products.forEach(product => {
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
}

const loadProducts = async () => {
	try {
		const products = await fetchProducts();
		displayProducts(products);
	} catch (error) {
		console.error('Failed to load products:', error);
	}
};

loadProducts();
