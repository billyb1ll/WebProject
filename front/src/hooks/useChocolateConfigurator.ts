import { useState, useCallback, useEffect } from "react";

export type ChocolateType = "dark" | "milk" | "white";
export type Topping = "none" | "nuts" | "sprinkles" | "fruit";
export type ChocolateShape = "square" | "round" | "heart";
export type PackagingType = "standard" | "gift" | "premium" | "eco";

export interface ChocolateConfig {
	chocolateType: ChocolateType;
	toppings: Topping[];
	shape: ChocolateShape;
	packaging: PackagingType;
	message: string;
	messageFont: string; // New property
}

export function useChocolateConfigurator() {
	const [currentStep, setCurrentStep] = useState(1);
	const [config, setConfig] = useState<ChocolateConfig>({
		chocolateType: "dark",
		toppings: [],
		shape: "square",
		packaging: "standard",
		message: "",
		messageFont: "cursive", // Default font
	});

	const nextStep = () => {
		if (currentStep < 5) {
			setCurrentStep(currentStep + 1);
		}
	};

	const prevStep = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const updateType = (chocolateType: ChocolateType) => {
		setConfig((prev) => ({ ...prev, chocolateType }));
	};

	const toggleTopping = (topping: Topping) => {
		setConfig((prev) => {
			const currentToppings = [...prev.toppings];
			if (topping === "none") {
				return { ...prev, toppings: [] };
			}

			// Remove 'none' if selecting other toppings
			const filteredToppings = currentToppings.filter((t) => t !== "none");

			if (filteredToppings.includes(topping)) {
				return {
					...prev,
					toppings: filteredToppings.filter((t) => t !== topping),
				};
			} else {
				return {
					...prev,
					toppings: [...filteredToppings, topping],
				};
			}
		});
	};

	const updateShape = (shape: ChocolateShape) => {
		setConfig((prev) => ({ ...prev, shape }));
	};

	const updatePackaging = (packaging: PackagingType) => {
		setConfig((prev) => ({ ...prev, packaging }));
	};

	const updateMessage = useCallback((message: string) => {
		// Create a completely new object to ensure React detects the change
		setConfig((prev) => ({
			...prev,
			message: message,
			// Adding a timestamp can sometimes help force React to recognize the update
			_lastUpdated: Date.now(),
		}));
	}, []);

	// Ensure we trigger rerenders when message changes
	useEffect(() => {
		// This effect runs when message changes
		// Force component using this hook to update
		const timer = setTimeout(() => {
			// This empty state update can sometimes help trigger rerenders
			setConfig((current) => ({ ...current }));
		}, 0);
		return () => clearTimeout(timer);
	}, [config.message]);

	const updateMessageFont = (font: string) => {
		setConfig((prev) => ({
			...prev,
			messageFont: font,
		}));
	};

	return {
		config,
		currentStep,
		nextStep,
		prevStep,
		updateType,
		toggleTopping,
		updateShape,
		updatePackaging,
		updateMessage,
		updateMessageFont,
	};
}
