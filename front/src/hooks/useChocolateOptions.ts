import { useState, useEffect } from "react";
import {
	chocolateService,
	ChocolateOption,
	ToppingOption,
	ShapeOption,
	PackagingOption,
	PriceData,
} from "../services/api/chocolateService";
import { toaster } from "../components/ui/toaster";

// Types for the hook's return value
interface UseChocolateOptionsReturn {
	chocolateTypes: ChocolateOption[];
	toppings: ToppingOption[];
	shapes: ShapeOption[];
	packagingOptions: PackagingOption[];
	pricing: PriceData | null;
	isLoading: boolean;
	isError: boolean;
	error: string | null;
}

/**
 * Hook to fetch all chocolate customization options from the API
 */
export function useChocolateOptions(): UseChocolateOptionsReturn {
	// States for different option types
	const [chocolateTypes, setChocolateTypes] = useState<ChocolateOption[]>([]);
	const [toppings, setToppings] = useState<ToppingOption[]>([]);
	const [shapes, setShapes] = useState<ShapeOption[]>([]);
	const [packagingOptions, setPackagingOptions] = useState<PackagingOption[]>(
		[]
	);
	const [pricing, setPricing] = useState<PriceData | null>(null);

	// Loading and error states
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Fetch all options on component mount
	useEffect(() => {
		async function fetchAllOptions() {
			setIsLoading(true);
			setIsError(false);
			setError(null);

			try {
				// Fetch all data in parallel
				const [types, toppingOptions, shapeOptions, packagingOpts, pricingData] =
					await Promise.all([
						chocolateService.getChocolateTypes(),
						chocolateService.getToppings(),
						chocolateService.getShapes(),
						chocolateService.getPackagingOptions(),
						chocolateService.getPricing(),
					]);

				setChocolateTypes(types);
				setToppings(toppingOptions);
				setShapes(shapeOptions);
				setPackagingOptions(packagingOpts);
				setPricing(pricingData);
			} catch (err: unknown) {
				setIsError(true);
				setError(err instanceof Error ? err.message : "Failed to load chocolate options");
				toaster.create({
					title: "Error",
					description: "Failed to load product options. Please try again later.",
					type: "error",
				});
			} finally {
				setIsLoading(false);
			}
		}

		fetchAllOptions();
	}, []);

	return {
		chocolateTypes,
		toppings,
		shapes,
		packagingOptions,
		pricing,
		isLoading,
		isError,
		error,
	};
}
