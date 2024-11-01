const API_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = async () => {
	try {
		const response = await fetch(API_URL);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error fetching products:', error);
	}
};
