const BASE_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = async () => {
	try {
		const response = await fetch(BASE_URL);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error fetching products:', error);
	}
};

export const deleteProduct = async id => {
	try {
		const response = await fetch(`${BASE_URL}/${id}`, {
			method: 'DELETE',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error deleting product:', error);
	}
};
