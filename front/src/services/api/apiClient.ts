import { API } from "../../constants/api";

/**
 * API response interface that matches backend response structure
 */
interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
	errors?: Record<string, string[]>;
}

/**
 * Interface for API error responses
 */
interface ApiError {
	status?: number;
	message?: string;
	errors?: Record<string, string[]>;
}

/**
 * Base API client for making HTTP requests with proper error handling
 */
class ApiClient {
	private baseUrl: string;
	private defaultHeaders: HeadersInit;

	constructor() {
		// Use environment variable if available, otherwise use default
		this.baseUrl = import.meta.env.VITE_API_URL || API.BASE_URL;

		this.defaultHeaders = {
			[API.HEADERS.CONTENT_TYPE]: "application/json",
		};
	}

	/**
	 * Get auth headers with JWT token if available
	 */
	private getAuthHeaders(): HeadersInit {
		const token = localStorage.getItem("token");
		return token ? { [API.HEADERS.AUTH]: `Bearer ${token}` } : {};
	}

	/**
	 * Format endpoint for use as a file path
	 */
	private formatEndpointForImport(endpoint: string): string {
		// Replace all forward slashes with underscores
		return endpoint.replace(/\//g, "_");
	}

	/**
	 * Make a GET request to the API
	 */
	async get<T>(endpoint: string, useMock = true): Promise<T> {
		// If in development mode and useMock is true, return mock data instead
		if (import.meta.env.DEV && useMock) {
			try {
				// Format endpoint for use in import path
				const formattedEndpoint = this.formatEndpointForImport(endpoint);
				const mockPath = `../mock/${formattedEndpoint}.ts`;

				// Dynamic import with proper error handling
				console.info(`[DEV] Attempting to load mock data from ${mockPath}`);
				const mockModule = await import(/* @vite-ignore */ mockPath);

				console.info(`[DEV] Using mock data for GET ${endpoint}`);
				return new Promise((resolve) =>
					setTimeout(() => resolve(mockModule.default), 500)
				);
			} catch (_error) {
				console.warn(
					`No mock data found for ${endpoint}, falling back to API call`
				);
			}
		}

		// Proceed with actual API call
		const headers = {
			...this.defaultHeaders,
			...this.getAuthHeaders(),
		};

		try {
			const response = await fetch(`${this.baseUrl}${endpoint}`, {
				method: "GET",
				headers,
			});

			return this.handleResponse<T>(response);
		} catch (error) {
			return this.handleError<T>(error);
		}
	}

	/**
	 * Make a POST request to the API
	 */
	async post<T, D = Record<string, unknown>>(
		endpoint: string,
		data: D,
		useMock = true
	): Promise<T> {
		// If in development mode and useMock is true, return mock data instead
		if (import.meta.env.DEV && useMock) {
			try {
				// Format endpoint for use in import path
				const formattedEndpoint = this.formatEndpointForImport(endpoint);
				const mockPath = `../mock/${formattedEndpoint}_post.ts`;

				// Dynamic import with proper error handling
				console.info(`[DEV] Attempting to load mock data from ${mockPath}`);
				const mockModule = await import(/* @vite-ignore */ mockPath);

				console.info(`[DEV] Using mock data for POST ${endpoint}`);
				return new Promise((resolve) =>
					setTimeout(() => resolve(mockModule.default), 500)
				);
			} catch (error) {
				console.warn(
					`No mock data found for POST ${endpoint}, falling back to API call`
				);
			}
		}

		// Proceed with actual API call
		const headers = {
			...this.defaultHeaders,
			...this.getAuthHeaders(),
		};

		try {
			const response = await fetch(`${this.baseUrl}${endpoint}`, {
				method: "POST",
				headers,
				body: JSON.stringify(data),
			});

			return this.handleResponse<T>(response);
		} catch (error) {
			return this.handleError<T>(error);
		}
	}

	/**
	 * Make a PUT request to the API
	 */
	async put<T, D = Record<string, unknown>>(
		endpoint: string,
		data: D
	): Promise<T> {
		const headers = {
			...this.defaultHeaders,
			...this.getAuthHeaders(),
		};

		try {
			const response = await fetch(`${this.baseUrl}${endpoint}`, {
				method: "PUT",
				headers,
				body: JSON.stringify(data),
			});

			return this.handleResponse<T>(response);
		} catch (error) {
			return this.handleError<T>(error);
		}
	}

	/**
	 * Make a DELETE request to the API
	 */
	async delete<T>(endpoint: string): Promise<T> {
		const headers = {
			...this.defaultHeaders,
			...this.getAuthHeaders(),
		};

		try {
			const response = await fetch(`${this.baseUrl}${endpoint}`, {
				method: "DELETE",
				headers,
			});

			return this.handleResponse<T>(response);
		} catch (error) {
			return this.handleError<T>(error);
		}
	}

	/**
	 * Handle API response and extract data
	 */
	private async handleResponse<T>(response: Response): Promise<T> {
		if (!response.ok) {
			const errorData = await response.json();
			throw {
				status: response.status,
				message: errorData.message || "Unknown error occurred",
				errors: errorData.errors,
			};
		}

		const responseData = (await response.json()) as ApiResponse<T>;

		if (!responseData.success) {
			throw {
				status: 400,
				message: responseData.message || "Operation failed",
				errors: responseData.errors || {},
			};
		}

		return responseData.data as T;
	}

	/**
	 * Handle errors from API requests
	 */
	private handleError<T>(error: unknown): Promise<T> {
		console.error("API request failed:", error);

		// Throw standardized error object
		throw {
			status: error instanceof Error ? 500 : (error as ApiError).status || 500,
			message:
				error instanceof Error
					? error.message
					: (error as ApiError).message || "Network request failed",
			errors: error instanceof Error ? {} : (error as ApiError).errors || {},
		};
	}
}

// Export a singleton instance
export const apiClient = new ApiClient();
