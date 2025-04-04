import * as THREE from "three";
import { ChocolateType, Topping } from "../../hooks/useChocolateConfigurator";

/**
 * Create a material for chocolate based on type
 */
export function createChocolateMaterial(chocolateType: ChocolateType) {
	const chocolateColors = {
		dark: "#3A2618",
		milk: "#8B5A2B",
		white: "#F5F5DC",
	};

	return {
		color: new THREE.Color(chocolateColors[chocolateType]),
		roughness: chocolateType === "white" ? 0.5 : 0.7,
		metalness: 0.2,
	};
}

/**
 * Create a material for toppings based on type
 */
export function createToppingMaterial(topping: Topping) {
	switch (topping) {
		case "nuts":
			return {
				color: new THREE.Color("#8B4513"),
				roughness: 0.8,
				metalness: 0.1,
			};
		case "sprinkles": {
			const sprinkleColors = ["#FF69B4", "#FFD700", "#7CFC00", "#00BFFF"];
			return {
				color: new THREE.Color(
					sprinkleColors[Math.floor(Math.random() * sprinkleColors.length)]
				),
				roughness: 0.5,
				metalness: 0.3,
			};
		}
		case "fruit":
			return {
				color: new THREE.Color(Math.random() > 0.5 ? "#FF6347" : "#8B0000"),
				roughness: 0.7,
				metalness: 0.1,
			};
		default:
			return {
				color: new THREE.Color("#A0522D"),
				roughness: 0.7,
				metalness: 0.1,
			};
	}
}
