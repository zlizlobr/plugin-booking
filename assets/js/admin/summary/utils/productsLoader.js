import { getGraphQLEndpoint } from './configHelpers.js';

let productsCache = null;
let loadingPromise = null;

export const fetch_products = async () => {
	if (productsCache) {
		return productsCache;
	}

	if (loadingPromise) {
		return loadingPromise;
	}

	loadingPromise = (async () => {
		const graphql_query = `
			query GetProducts {
				products {
					id
					name
					price
					thumbnail
				}
			}
		`;

		try {
			const endpoint = getGraphQLEndpoint();
			const response = await fetch(endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: graphql_query
				})
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();

			if (result.errors) {
				const errorMessages = result.errors.map(err => err.message).join(', ');
				console.error('[ProductsLoader] GraphQL errors:', errorMessages);
				throw new Error(errorMessages);
			}

			const products = result.data?.products || [];
			productsCache = products;
			loadingPromise = null;
			
			return products;
		} catch (error) {
			console.error('[ProductsLoader] Error fetching products:', error);
			loadingPromise = null;
			throw error;
		}
	})();

	return loadingPromise;
};

export const clear_products_cache = () => {
	productsCache = null;
	loadingPromise = null;
};

