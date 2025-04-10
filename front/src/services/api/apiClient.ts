import { API } from "../../constants/api";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

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
 * API client for handling HTTP requests
 * @debug Common network issues can be debugged here
 */
class ApiClient {
	private client: AxiosInstance;
	private baseUrl: string;
	private defaultHeaders: HeadersInit;
	private useMockData: boolean;

	/**
	 * Create a new API client instance
	 * @debug If API calls fail, check baseURL is correct for your environment
	 */
	constructor() {
		// Use environment variable if available, otherwise use default
		this.baseUrl = import.meta.env.VITE_API_URL || API.BASE_URL;
		this.baseUrl = this.baseUrl.endsWith("/") ? this.baseUrl : `${this.baseUrl}/`;

		// Check if we should use mock data from env
		this.useMockData = import.meta.env.VITE_USE_MOCK_DATA === "true";

		this.defaultHeaders = {
			"Content-Type": "application/json",
		};

		this.client = axios.create({
			baseURL: this.baseUrl,
			timeout: 10000,
			headers: {
				"Content-Type": "application/json",
			},
		});

		// Add request interceptor for debugging
		this.client.interceptors.request.use(
			(config) => {
				// Log outgoing requests in development environment
				if (process.env.NODE_ENV === "development") {
					console.debug(
						`🌐 API Request: ${config.method?.toUpperCase()} ${config.url}`,
						config.params || config.data || {}
					);
				}
				return config;
			},
			(error) => {
				console.error("API Request Error:", error);
				return Promise.reject(error);
			}
		);

		// Add response interceptor for debugging
		this.client.interceptors.response.use(
			(response) => {
				// Log successful responses in development environment
				if (process.env.NODE_ENV === "development") {
					console.debug(
						`✅ API Response: ${response.config.method?.toUpperCase()} ${
							response.config.url
						}`,
						{ status: response.status, data: response.data }
					);
				}
				return response;
			},
			(error) => {
				// Log error responses with detailed information
				console.error("API Response Error:", {
					url: error.config?.url,
					method: error.config?.method?.toUpperCase(),
					status: error.response?.status,
					message: error.message,
					responseData: error.response?.data,
				});
				return Promise.reject(error);
			}
		);
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
		// Replace all forward slashes with underscores and remove leading underscore if present
		const formatted = endpoint.replace(/\//g, "_").replace(/^_/, "");
		return formatted;
	}

	/**
	 * Try to import mock data using various file naming conventions
	 */
	private async tryImportMockData(endpoint: string): Promise<any> {
		const formattedEndpoint = this.formatEndpointForImport(endpoint);
		const possiblePaths = [
			`../mock/${formattedEndpoint}.ts`,
			`../mock/_${formattedEndpoint}.ts`,
			`../mock/products.ts`, // Special case for products endpoint
		];

		for (const path of possiblePaths) {
			try {
				console.info(`[DEV] Attempting to load mock data from ${path}`);
				// Using dynamic import with vite-ignore comment to allow variable path
				const mockModule = await import(/* @vite-ignore */ path);
				console.info(`[DEV] Using mock data for ${endpoint} from ${path}`);
				return mockModule.default;
			} catch (error) {
				// Continue to next path if this one fails
				console.debug(`No mock data at ${path}, trying next path...`);
			}
		}

		// If all paths fail, throw an error to fall back to API
		throw new Error(`No mock data found for ${endpoint}`);
	}

	/**
	 * Make a GET request to the API
	 */
	async get<T>(endpoint: string, useMock = this.useMockData): Promise<T> {
		// If in development mode and useMock is true, return mock data instead
		if (import.meta.env.DEV && useMock) {
			try {
				const mockData = await this.tryImportMockData(endpoint);
				return new Promise((resolve) => setTimeout(() => resolve(mockData), 500));
			} catch (error) {
				console.warn(
					`No mock data found for ${endpoint}, falling back to API call`
				);
			}
		}

		// Proceed with actual API call
		try {
			const response = await this.client.get(endpoint);

			// Check if response is HTML instead of JSON
			if (
				typeof response.data === "string" &&
				response.data.includes("<!doctype html>")
			) {
				throw new Error(
					"Received HTML response instead of JSON. Check API server or endpoint URL."
				);
			}

			return response.data;
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
		useMock = this.useMockData
	): Promise<T> {
		// If in development mode and useMock is true, return mock data instead
		if (import.meta.env.DEV && useMock) {
			try {
				// Try various naming patterns for the mock POST endpoint
				const formattedEndpoint = this.formatEndpointForImport(endpoint);
				const possiblePaths = [
					`../mock/${formattedEndpoint}_post.ts`,
					`../mock/_${formattedEndpoint}_post.ts`,
				];

				for (const path of possiblePaths) {
					try {
						console.info(`[DEV] Attempting to load mock data from ${path}`);
						const mockModule = await import(/* @vite-ignore */ path);
						console.info(`[DEV] Using mock data for POST ${endpoint}`);
						return new Promise((resolve) =>
							setTimeout(() => resolve(mockModule.default), 500)
						);
					} catch (error) {
						// Continue to next path if this one fails
						console.debug(`No mock POST data at ${path}, trying next path...`);
					}
				}

				throw new Error(`No mock POST data found for ${endpoint}`);
			} catch (error) {
				console.warn(
					`No mock data found for POST ${endpoint}, falling back to API call`
				);
			}
		}

		// Proceed with actual API call
		try {
			const response = await this.client.post(endpoint, data);

			// Check if response is HTML instead of JSON
			if (
				typeof response.data === "string" &&
				response.data.includes("<!doctype html>")
			) {
				throw new Error(
					"Received HTML response instead of JSON. Check API server or endpoint URL."
				);
			}

			return response.data;
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
		try {
			const response = await this.client.put(endpoint, data);
			return response.data;
		} catch (error) {
			return this.handleError<T>(error);
		}
	}

	/**
	 * Make a DELETE request to the API
	 */
	async delete<T>(endpoint: string): Promise<T> {
		try {
			const response = await this.client.delete(endpoint);
			return response.data;
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
