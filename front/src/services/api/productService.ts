import { apiClient } from "./apiClient";
import { API } from "../../constants/api";

// Product interfaces that match backend types
export interface Product {
	id: number;
	name: string;
	description?: string;
	price: number;
	category: string;
	quantities?: number;
	sold?: number;
	status?: boolean;
	images?: ProductImage[];
}

export interface ProductImage {
	id: number;
	productId: number;
	imageUrl: string;
	isPrimary: boolean;
}

// Filter/search parameters interface
export interface ProductFilters {
	category?: string;
	minPrice?: number;
	maxPrice?: number;
	search?: string;
	page?: number;
	limit?: number;
	sort?: string;
}

// Paginated response interface
export interface PaginatedProducts {
	products: Product[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

/**
 * Service for product-related API calls
 */
class ProductService {
	/**
	 * Get all products with optional filtering
	 */
	async getProducts(filters?: ProductFilters): Promise<PaginatedProducts> {
		// Build query params
		const queryParams = filters ? new URLSearchParams() : undefined;

		if (filters) {
			Object.entries(filters).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					queryParams?.set(key, value.toString());
				}
			});
		}

		const endpoint = `${API.ENDPOINTS.PRODUCTS}${
			queryParams ? `?${queryParams}` : ""
		}`;
		return apiClient.get<PaginatedProducts>(endpoint);
	}

	/**
	 * Get a single product by ID
	 */
	async getProduct(id: number): Promise<Product> {
		return apiClient.get<Product>(`${API.ENDPOINTS.PRODUCTS}/${id}`);
	}

	/**
	 * Get products by category
	 */
	async getProductsByCategory(category: string): Promise<Product[]> {
		return apiClient.get<Product[]>(
			`${API.ENDPOINTS.PRODUCTS}/category/${category}`
		);
	}

	/**
	 * Get featured products
	 */
	async getFeaturedProducts(): Promise<Product[]> {
		return apiClient.get<Product[]>(`${API.ENDPOINTS.PRODUCTS}/featured`);
	}
}

export const productService = new ProductService();
