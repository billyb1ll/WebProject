import { useState, useEffect } from "react";
import {
	productService,
	Product,
	ProductFilters,
} from "../services/api/productService";
import { toaster } from "../components/ui/toaster";

/**
 * Custom hook for fetching and managing products
 */
export function useProducts(initialFilters?: ProductFilters) {
	const [products, setProducts] = useState<Product[]>([]);
	const [pagination, setPagination] = useState<{
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	}>({
		total: 0,
		page: 1,
		limit: 10,
		totalPages: 0,
	});

	const [filters, setFilters] = useState<ProductFilters>(
		initialFilters || {
			page: 1,
			limit: 10,
		}
	);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	/**
	 * Fetch products based on current filters
	 */
	const fetchProducts = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const result = await productService.getProducts(filters);
			setProducts(result.products);
			setPagination({
				total: result.total,
				page: result.page,
				limit: result.limit,
				totalPages: result.totalPages,
			});
		} catch (err: unknown) {
			const errorMessage = err instanceof Error ? err.message : "Failed to load products";
			setError(errorMessage);
			toaster.create({
				title: "Error",
				description: errorMessage,
				type: "error",
			});
		} finally {
			setIsLoading(false);
		}
	};

	/**
	 * Update filters and fetch new products
	 */
	const updateFilters = (newFilters: Partial<ProductFilters>) => {
		setFilters((prev) => ({
			...prev,
			...newFilters,
			// Reset to page 1 if anything other than page changes
			page: "page" in newFilters ? newFilters.page || 1 : 1,
		}));
	};

	/**
	 * Navigate to specific page
	 */
	const goToPage = (page: number) => {
		if (page < 1 || page > pagination.totalPages) return;
		updateFilters({ page });
	};

	// Fetch products when filters change
	useEffect(() => {
		fetchProducts();
	}, [filters]);

	return {
		products,
		pagination,
		filters,
		isLoading,
		error,
		updateFilters,
		goToPage,
		refetch: fetchProducts,
	};
}
