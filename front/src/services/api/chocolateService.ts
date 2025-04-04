import { apiClient } from "./apiClient";
import { API } from "../../constants/api";
import {
	ChocolateType,
	ChocolateShape,
	PackagingType,
	Topping,
} from "../../hooks/useChocolateConfigurator";

// Interfaces for API responses
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

// Price data structure
export interface PriceData {
	baseChocolate: Record<ChocolateType, number>;
	toppings: Record<Topping, number>;
	shapes: Record<ChocolateShape, number>;
	packaging: Record<PackagingType, number>;
	messageBasePrice: number;
	messageCharPrice: number;
}

// Custom chocolate creation data
export interface CustomChocolateData {
	chocolateType: ChocolateType;
	toppings: Topping[];
	shape: ChocolateShape;
	packaging: PackagingType;
	message?: string;
	messageFont?: string;
}

/**
 * Service for chocolate customization-related API calls
 */
class ChocolateService {
	/**
	 * Get available chocolate types
	 */
	async getChocolateTypes(): Promise<ChocolateOption[]> {
		return apiClient.get<ChocolateOption[]>(`${API.ENDPOINTS.CHOCOLATE}/types`);
	}

	/**
	 * Get available toppings
	 */
	async getToppings(): Promise<ToppingOption[]> {
		return apiClient.get<ToppingOption[]>(`${API.ENDPOINTS.CHOCOLATE}/toppings`);
	}

	/**
	 * Get available shapes
	 */
	async getShapes(): Promise<ShapeOption[]> {
		return apiClient.get<ShapeOption[]>(`${API.ENDPOINTS.CHOCOLATE}/shapes`);
	}

	/**
	 * Get packaging options
	 */
	async getPackagingOptions(): Promise<PackagingOption[]> {
		return apiClient.get<PackagingOption[]>(
			`${API.ENDPOINTS.CHOCOLATE}/packaging`
		);
	}

	/**
	 * Get pricing data for chocolate customization
	 */
	async getPricing(): Promise<PriceData> {
		return apiClient.get<PriceData>(`${API.ENDPOINTS.CHOCOLATE}/pricing`);
	}

	/**
	 * Submit a custom chocolate order
	 */
	async createCustomOrder(
		customData: CustomChocolateData
	): Promise<{ orderId: number }> {
		return apiClient.post<{ orderId: number }, CustomChocolateData>(
			`${API.ENDPOINTS.CHOCOLATE}/custom`,
			customData
		);
	}
}

export const chocolateService = new ChocolateService();
