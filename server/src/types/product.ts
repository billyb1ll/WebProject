export interface Product {
	id: number;
	name: string;
	description?: string;
	price: number;
	category: string;
	quantities?: number;
	sold?: number;
	status?: boolean;
}
