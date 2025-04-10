// Message constants for API responses
export const MESSAGES = {
	PRODUCT: {
		FETCH_ALL_ERROR: "Error fetching products",
		FETCH_ONE_ERROR: "Error fetching product details",
		NOT_FOUND: "Product not found",
		CREATE_SUCCESS: "Product created successfully",
		CREATE_ERROR: "Error creating product",
		UPDATE_SUCCESS: "Product updated successfully",
		UPDATE_ERROR: "Error updating product",
		DELETE_SUCCESS: "Product with ID {id} deleted successfully",
		DELETE_ERROR: "Error deleting product",
	},
	ADMIN: {
		LOGIN_SUCCESS: "Admin login successful",
		LOGIN_ERROR: "Invalid username or password",
		INVALID_CREDENTIALS: "Invalid username or password",
		NOT_FOUND: "Admin not found",
		AUTH_ERROR: "Authentication error",
		TOKEN_INVALID: "Invalid token",
		TOKEN_EXPIRED: "Token expired",
		PROFILE_ERROR: "Error fetching admin profile",
		UPDATE_SUCCESS: "Profile updated successfully",
		UPDATE_ERROR: "Error updating profile",
	},
	GENERAL: {
		SERVER_ERROR: "Internal server error",
		INVALID_REQUEST: "Invalid request",
		UNAUTHORIZED: "Unauthorized access",
		FORBIDDEN: "Access forbidden",
	},
	ERROR: {
		AUTH: {
			REQUIRED: "Authentication is required",
			INVALID_TOKEN: "Invalid authentication token",
			FAILED: "Authentication failed",
		},
		LOGIN: "Login failed",
	},
};
