// API constants for the server
export const API = {
	BASE_URL: "/api/v1",
	ENDPOINTS: {
		PRODUCTS: "/products",
		PRODUCT_CATEGORIES: "",
		PRODUCT_WITH_IMAGES: "/products/with-images",
		PRODUCTS_FEATURED: "/products/featured",
		ADMIN: "/admin",
	},
	STATUS_CODES: {
		OK: 200,
		CREATED: 201,
		BAD_REQUEST: 400,
		UNAUTHORIZED: 401,
		FORBIDDEN: 403,
		NOT_FOUND: 404,
		CONFLICT: 409,
		SERVER_ERROR: 500,
	},
	MOCK: {
		JWT_TOKEN: "mock-jwt-token",
	},
};
