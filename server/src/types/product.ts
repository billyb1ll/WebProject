// Types for product-related data
export interface Product {
	product_id: number;
	product_name: string;
	product_status: boolean;
	product_quantities: number;
	product_sold: number;
	product_price: number;
	product_category: string;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
}

export interface ProductDescription {
	product_id: number;
	product_des: string;
	specifications: any;
}

export interface ProductImage {
	image_id: number;
	product_id: number;
	image_url: string;
	is_primary: boolean;
	created_at: string;
}

export interface ProductWithDescription extends Product {
	product_des?: string;
	specifications?: any;
}

export interface ProductWithImages extends ProductWithDescription {
	images?: ProductImage[];
}

export interface ProductCreate {
	name: string;
	status?: boolean;
	quantities?: number;
	price: number;
	category: string;
	description?: string;
	specifications?: any;
}

export interface ProductUpdate extends ProductCreate {
	id: number;
}
