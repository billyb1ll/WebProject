/**
 * Types for API responses and product data
 */

// API response structure
export interface ApiResponse<T> {
	success: boolean;
	data: T;
	message?: string;
}

// Server product types that match the actual API response format
export interface ServerProduct {
	product_id?: number;
	product_name?: string;
	product_des?: string;
	product_price?: number | string;
	product_category?: string;
	product_quantities?: number;
	product_sold?: number;
	product_status?: boolean | number;
	id?: number;
	name?: string;
	description?: string;
	price?: number;
	category?: string;
	quantities?: number;
	sold?: number;
	status?: boolean;
	images?: ServerProductImage[];
}

export interface ServerProductImage {
	image_id?: number;
	product_id?: number;
	image_url?: string;
	is_primary?: boolean | number;
	id?: number;
	productId?: number;
	imageUrl?: string;
	isPrimary?: boolean | number;
	created_at?: string;
}

// Frontend formatted product for display
export interface MappedProduct {
	id: number;
	name: string;
	price: number;
	image: string;
	description: string;
}
