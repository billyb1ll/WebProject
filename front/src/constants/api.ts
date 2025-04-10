export const API = {
	BASE_URL: "http://localhost:3030/api/v1",
	ENDPOINTS: {
		PRODUCTS: "/products",
		PRODUCT_CATEGORIES: "/products/categories",
		PRODUCT_FEATURED: "/products/featured",
		ADMIN: "/admin",
		LOGIN: "/admin/login",
		PROFILE: "/admin/profile",
		CHOCOLATE: "/chocolate",
		ORDERS: "/orders",
		CUSTOMERS: "/customers",
	},
	HEADERS: {
		CONTENT_TYPE: "application/json",
		AUTH: "Authorization",
	},
	MOCK: {
		JWT_TOKEN: "mock-jwt-token",
	},
};
