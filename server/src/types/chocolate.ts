export type ChocolateType = "dark" | "milk" | "white";
export type Topping = "none" | "nuts" | "sprinkles" | "fruit";
export type ChocolateShape = "square" | "round" | "heart";
export type PackagingType = "standard" | "gift" | "premium" | "eco";

export interface ChocolateOption {
	id: number;
	type: ChocolateType;
	name: string;
	description: string;
	imageUrl: string;
	price: number;
}

export interface ToppingOption {
	id: number;
	type: Topping;
	name: string;
	description: string;
	imageUrl: string;
	price: number;
}

export interface ShapeOption {
	id: number;
	type: ChocolateShape;
	name: string;
	description: string;
	imageUrl: string;
	price: number;
}

export interface PackagingOption {
	id: number;
	type: PackagingType;
	name: string;
	description: string;
	imageUrl: string;
	price: number;
	features: string[];
}

export interface PriceData {
	baseChocolate: Record<ChocolateType, number>;
	toppings: Record<Topping, number>;
	shapes: Record<ChocolateShape, number>;
	packaging: Record<PackagingType, number>;
	messageBasePrice: number;
	messageCharPrice: number;
}

export interface CustomChocolateData {
	chocolateType: ChocolateType;
	toppings: Topping[];
	shape: ChocolateShape;
	packaging: PackagingType;
	message?: string;
	messageFont?: string;
}

export interface CustomChocolateOrder {
	customId: number;
	orderId: number;
	baseChocolateId: number;
	shapeId: number;
	packagingId: number | null;
	message: string | null;
	messageFont: string | null;
	toppings: number[];
	price: number;
}
