import { apiClient } from "./apiClient";
import { API } from "../../constants/api";
import { ApiResponse, ServerProduct } from "../../types/product.types";

// Product interfaces that match backend types
export interface ProductImage {
	id: number;
	productId: number;
	imageUrl: string;
	isPrimary: boolean;
	createdAt?: string;
}

export interface ProductCategory {
	id: number;
	name: string;
	createdAt?: string;
}

export interface Product {
	id: number;
	name: string;
	description?: string;
	price: number;
	categoryId?: number;
	category?: string;
	quantities?: number;
	sold?: number;
	status?: boolean;
	images?: ProductImage[];
}

export interface ProductWithImages extends Product {
	images: ProductImage[];
}

export interface ProductCategoryWithProducts extends ProductCategory {
	products: Product[];
}

export interface ProductWithCategoryObj extends Omit<Product, "category"> {
	category: ProductCategory;
}

export interface ProductWithCategoryAndImages extends ProductWithCategoryObj {
	images: ProductImage[];
}

export type ProductWithCategoryAndImagesResponse =
	ApiResponse<ProductWithCategoryAndImages>;

export interface ProductFilters {
	page?: number;
	limit?: number;
	categoryId?: number;
	search?: string;
	sort?: "price" | "name" | "newest";
	order?: "asc" | "desc";
}

export interface ProductsResponse {
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
	 * Get products with optional filtering
	 */
	async getProducts(filters?: ProductFilters): Promise<ProductsResponse> {
		const queryParams = new URLSearchParams();

		// Add filter parameters to query string if they exist
		if (filters) {
			if (filters.page) queryParams.append("page", filters.page.toString());
			if (filters.limit) queryParams.append("limit", filters.limit.toString());
			if (filters.categoryId)
				queryParams.append("categoryId", filters.categoryId.toString());
			if (filters.search) queryParams.append("search", filters.search);
			if (filters.sort) queryParams.append("sort", filters.sort);
			if (filters.order) queryParams.append("order", filters.order);
		}

		const queryString = queryParams.toString()
			? `?${queryParams.toString()}`
			: "";

		const response = await apiClient.get<ApiResponse<ProductsResponse>>(
			`${API.ENDPOINTS.PRODUCTS}${queryString}`
		);
		return response.data;
	}

	/**
	 * Get featured products for homepage display
	 */
	async getFeaturedProducts(): Promise<ServerProduct[]> {
		const response = await apiClient.get<ApiResponse<ServerProduct[]>>(
			`${API.ENDPOINTS.PRODUCT_FEATURED}`
		);
		return response.data;
	}

	/**
	 * Get a single product by ID
	 */
	async getProductById(
		productId: number
	): Promise<ProductWithCategoryAndImages> {
		const response = await apiClient.get<
			ApiResponse<ProductWithCategoryAndImages>
		>(`${API.ENDPOINTS.PRODUCTS}/${productId}`);
		return response.data;
	}

	/**
	 * Get products by category
	 */
	async getProductsByCategory(categoryId: number): Promise<Product[]> {
		const response = await apiClient.get<ApiResponse<Product[]>>(
			`${API.ENDPOINTS.PRODUCTS}/category/${categoryId}`
		);
		return response.data;
	}

	/**
	 * Get all product categories
	 */
	async getCategories(): Promise<ProductCategory[]> {
		const response = await apiClient.get<ApiResponse<ProductCategory[]>>(
			`${API.ENDPOINTS.PRODUCT_CATEGORIES}`
		);
		return response.data;
	}

	/**
	 * Map server product data to frontend format
	 */
	mapServerProductToProduct(serverProduct: ServerProduct): Product {
		return {
			id: serverProduct.id || serverProduct.product_id || 0,
			name: serverProduct.name || serverProduct.product_name || "",
			description: serverProduct.description || serverProduct.product_des || "",
			price:
				typeof serverProduct.price === "number"
					? serverProduct.price
					: typeof serverProduct.product_price === "number"
					? serverProduct.product_price
					: parseFloat(serverProduct.product_price || "0"),
			category: serverProduct.category || serverProduct.product_category || "",
			quantities:
				serverProduct.quantities || serverProduct.product_quantities || 0,
			sold: serverProduct.sold || serverProduct.product_sold || 0,
			status: serverProduct.status || !!serverProduct.product_status,
			images: serverProduct.images?.map((img) => ({
				id: img.id || img.image_id || 0,
				productId: img.productId || img.product_id || 0,
				imageUrl: img.imageUrl || img.image_url || "",
				isPrimary:
					typeof img.isPrimary === "boolean"
						? img.isPrimary
						: typeof img.is_primary === "boolean"
						? img.is_primary
						: !!img.is_primary,
				createdAt: img.created_at,
			})),
		};
	}
}

export const productService = new ProductService();
