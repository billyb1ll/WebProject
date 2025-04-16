import { apiClient } from "./apiClient";

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: "customer" | "admin" | string; // Explicitly define possible roles
	avatar?: string;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface AdminLoginCredentials {
	username: string;
	password: string;
}

export interface SignupData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface AuthResponse {
	user: User;
	token: string;
}

export interface ValidationError {
	field: string;
	message: string;
}

// Class for handling authentication operations
class AuthService {
	// Store the current authenticated user
	private currentUser: User | null = null;
	private baseEndpoint = "auth";
	private useMockData = import.meta.env.VITE_USE_MOCK_DATA === "true";

	constructor() {
		// Check if we already have a token when service initializes
		this.loadUserFromStorage();
	}

	/**
	 * Check if user is authenticated
	 */
	isAuthenticated(): boolean {
		return !!this.getToken();
	}

	/**
	 * Get current authenticated user
	 */
	getCurrentUser(): User | null {
		return this.currentUser;
	}

	/**
	 * Check if current user is an admin
	 */
	isAdmin(): boolean {
		return this.currentUser?.role === "admin";
	}

	/**
	 * Check if current user is a customer
	 */
	isCustomer(): boolean {
		return this.currentUser?.role === "customer";
	}

	/**
	 * Get authentication token
	 */
	getToken(): string | null {
		return localStorage.getItem("token");
	}

	/**
	 * Load user data from localStorage if available
	 */
	private loadUserFromStorage(): void {
		try {
			const userJson = localStorage.getItem("user");
			if (userJson) {
				this.currentUser = JSON.parse(userJson);
			}
		} catch (e) {
			console.error("Failed to parse user from storage", e);
			this.logout(); // Clear potentially corrupted data
		}
	}

	/**
	 * Save authentication data to localStorage
	 */
	private saveAuthData(user: User, token: string): void {
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("token", token);
		this.currentUser = user;
	}

	/**
	 * Log in a user
	 * @param credentials - User's email and password
	 */
	async login(credentials: LoginCredentials): Promise<User> {
		try {
			// Try to login via the API endpoint
			const response = await apiClient.post<any>(
				`${this.baseEndpoint}/login`,
				credentials
			);

			if (!response || !response.success) {
				throw new Error(response?.message || "Login failed");
			}

			// Extract user and token from response
			const { user, token } = response;

			// Save authentication data
			this.saveAuthData(user, token);
			return user;
		} catch (error) {
			console.error("Login failed:", error);

			// Only use mock data in development as fallback
			if (import.meta.env.DEV && this.useMockData) {
				console.warn("Using mock login as fallback");

				// For mock implementation
				await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

				const mockResponse = {
					user: {
						id: "12345",
						firstName: credentials.email.split("@")[0],
						lastName: "",
						email: credentials.email,
						role: "customer",
						avatar: "",
					},
					token: "mock-jwt-token-" + Math.random().toString(36).substring(2),
				};

				// Save authentication data
				this.saveAuthData(mockResponse.user, mockResponse.token);
				return mockResponse.user;
			}

			throw new Error(
				"Login failed. Please check your credentials and try again."
			);
		}
	}

	/**
	 * Log in an admin
	 * @param credentials - Admin's username and password
	 */
	async adminLogin(credentials: AdminLoginCredentials): Promise<User> {
		try {
			// Try to login via the admin API endpoint
			const response = await apiClient.post<any>(
				`${this.baseEndpoint}/admin/login`,
				credentials
			);

			if (!response || !response.success) {
				throw new Error(response?.message || "Admin login failed");
			}

			// Extract user and token from response
			const { user, token } = response;

			// Save authentication data
			this.saveAuthData(user, token);
			return user;
		} catch (error) {
			console.error("Admin login failed:", error);

			// Only use mock data in development as fallback
			if (import.meta.env.DEV && this.useMockData) {
				console.warn("Using mock admin login as fallback");

				// For mock implementation
				await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

				const mockResponse = {
					user: {
						id: "admin-" + Math.random().toString(36).substring(2),
						firstName: "Admin",
						lastName: "User",
						email: "admin@ratamoth.com",
						role: "admin",
						avatar: "",
					},
					token: "mock-admin-jwt-token-" + Math.random().toString(36).substring(2),
				};

				// Save authentication data
				this.saveAuthData(mockResponse.user, mockResponse.token);
				return mockResponse.user;
			}

			throw new Error(
				"Admin login failed. Please check your credentials and try again."
			);
		}
	}

	/**
	 * Unified login for both customers and admins
	 * @param identifier - Email or username
	 * @param password - User password
	 */
	async unifiedLogin(identifier: string, password: string): Promise<User> {
		try {
			// Try to login via the unified API endpoint
			const response = await apiClient.post<any>(
				`${this.baseEndpoint}/unified-login`,
				{ email: identifier, password }
			);

			if (!response || !response.success) {
				throw new Error(response?.message || "Login failed");
			}

			// Extract user and token from response
			const { user, token } = response;

			// Save authentication data
			this.saveAuthData(user, token);
			return user;
		} catch (error) {
			console.error("Login failed:", error);

			// Only use mock data in development as fallback
			if (import.meta.env.DEV && this.useMockData) {
				console.warn("Using mock login as fallback");

				// For mock implementation
				await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

				const mockResponse = {
					user: {
						id: "12345",
						firstName: identifier.includes("@")
							? identifier.split("@")[0]
							: identifier,
						lastName: "",
						email: identifier.includes("@")
							? identifier
							: `${identifier}@ratamoth.com`,
						role: identifier.toLowerCase().includes("admin") ? "admin" : "customer",
						avatar: "",
					},
					token: "mock-jwt-token-" + Math.random().toString(36).substring(2),
				};

				// Save authentication data
				this.saveAuthData(mockResponse.user, mockResponse.token);
				return mockResponse.user;
			}

			throw new Error(
				"Login failed. Please check your credentials and try again."
			);
		}
	}

	/**
	 * Validate signup data on the server before actually registering
	 * This helps check for duplicate emails, etc.
	 * @param userData - User registration data
	 */
	async validateSignup(userData: SignupData): Promise<ValidationError[]> {
		try {
			// Attempt to validate signup data with the backend
			const response = await apiClient.post<any>(
				`${this.baseEndpoint}/validate`,
				userData
			);

			if (!response || !response.success) {
				throw new Error(response?.message || "Validation failed");
			}

			return response.errors || [];
		} catch (error: any) {
			// If we're in development mode and using mock data, simulate validation
			if (import.meta.env.DEV && this.useMockData) {
				console.warn("Using mock validation as fallback");
				await new Promise((resolve) => setTimeout(resolve, 500));

				// Optional: simulate some validation errors for testing
				if (userData.email.includes("taken@")) {
					return [{ field: "email", message: "This email is already taken" }];
				}

				return [];
			}

			console.error("Validation failed:", error);
			throw new Error("Validation failed. Please try again later.");
		}
	}

	/**
	 * Register a new user
	 * @param userData - User registration data
	 */
	async signup(userData: SignupData): Promise<User> {
		try {
			// Try to signup via the API endpoint
			const response = await apiClient.post<any>(
				`${this.baseEndpoint}/register`,
				userData
			);

			if (!response || !response.success) {
				throw new Error(response?.message || "Registration failed");
			}

			// Extract user and token from response
			const { user, token } = response;

			// Save authentication data
			this.saveAuthData(user, token);
			return user;
		} catch (error) {
			console.error("Signup failed:", error);

			// Only use mock data in development as fallback
			if (import.meta.env.DEV && this.useMockData) {
				console.warn("Using mock signup as fallback");

				// For mock implementation
				await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

				const mockResponse = {
					user: {
						id: "new-" + Math.random().toString(36).substring(2),
						firstName: userData.firstName,
						lastName: userData.lastName || "",
						email: userData.email,
						role: "customer",
						avatar: "",
					},
					token: "mock-jwt-token-" + Math.random().toString(36).substring(2),
				};

				// Save authentication data
				this.saveAuthData(mockResponse.user, mockResponse.token);
				return mockResponse.user;
			}

			throw new Error("Registration failed. Please try again later.");
		}
	}

	/**
	 * Request a password reset for a user account
	 * @param email - User's email address
	 */
	async requestPasswordReset(email: string): Promise<boolean> {
		try {
			// Try to request password reset via the API endpoint
			const response = await apiClient.post<any>(
				`${this.baseEndpoint}/request-password-reset`,
				{ email }
			);

			if (!response || !response.success) {
				throw new Error(response?.message || "Password reset request failed");
			}

			return true;
		} catch (error) {
			console.error("Password reset request failed:", error);

			// Only use mock data in development as fallback
			if (import.meta.env.DEV && this.useMockData) {
				console.warn("Using mock password reset request as fallback");

				// For mock implementation
				await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

				// Always return true in mock implementation to simulate successful submission
				// regardless of whether the email exists in the system
				return true;
			}

			throw new Error("Password reset request failed. Please try again later.");
		}
	}

	/**
	 * Reset a user's password using the reset token
	 * @param token - Password reset token sent to user's email
	 * @param newPassword - New password to set
	 */
	async resetPassword(token: string, newPassword: string): Promise<boolean> {
		try {
			// Try to reset password via the API endpoint
			const response = await apiClient.post<any>(
				`${this.baseEndpoint}/reset-password`,
				{ token, newPassword }
			);

			if (!response || !response.success) {
				throw new Error(response?.message || "Password reset failed");
			}

			return true;
		} catch (error) {
			console.error("Password reset failed:", error);

			// Only use mock data in development as fallback
			if (import.meta.env.DEV && this.useMockData) {
				console.warn("Using mock password reset as fallback");

				// For mock implementation
				await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

				// In a real implementation, this would verify the token and set the new password
				return true;
			}

			throw new Error("Password reset failed. Please try again later.");
		}
	}

	/**
	 * Log out the current user
	 */
	logout(): void {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		this.currentUser = null;
	}
}

// Export a singleton instance
export const authService = new AuthService();
