export const MESSAGES = {
	SUCCESS: {
		FETCH: "Data retrieved successfully",
		CREATE: "Created successfully",
		UPDATE: "Updated successfully",
		DELETE: "Deleted successfully",
		LOGIN: "Login successful",
		PROFILE: "Profile retrieved successfully",
	},
	ERROR: {
		FETCH: "Failed to fetch data",
		CREATE: "Failed to create resource",
		UPDATE: "Failed to update resource",
		DELETE: "Failed to delete resource",
		LOGIN: "Login failed",
		AUTH: {
			REQUIRED: "Authentication required",
			INVALID_TOKEN: "Invalid token",
			FAILED: "Authentication failed",
		},
		SERVER: "Internal Server Error",
	},
	PRODUCT: {
		FETCH_ALL_ERROR: "Failed to fetch products",
		FETCH_ONE_ERROR: "Failed to fetch product",
		CREATE_ERROR: "Failed to create product",
		UPDATE_ERROR: "Failed to update product",
		DELETE_ERROR: "Failed to delete product",
		DELETE_SUCCESS: "Product {id} deleted",
	},
	ADMIN: {
		PROFILE_ERROR: "Failed to fetch profile",
		UPDATE_ERROR: "Failed to update profile",
		UPDATE_SUCCESS: "Profile updated successfully",
		INVALID_CREDENTIALS: "Invalid credentials",
	},
};
