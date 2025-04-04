import React, { useMemo } from "react";
import {
	Topping,
	ChocolateShape,
} from "../../../../hooks/useChocolateConfigurator";
import { createToppingMaterial } from "../../../../utils/3d/materialUtils";

interface ToppingsModelProps {
	toppings: Topping[];
	shape: ChocolateShape;
}

/**
 * ToppingsModel handles the generation and placement of toppings on the chocolate surface.
 * It uses shape-specific algorithms to ensure toppings are only placed within the
 * boundaries of the chocolate and are distributed naturally.
 */
export default function ToppingsModel({ toppings, shape }: ToppingsModelProps) {
	// Skip rendering if no toppings selected or "none" is selected
	const shouldSkip = toppings.includes("none") || toppings.length === 0;

	/**
	 * These constants define the boundaries for each shape
	 * Values are calibrated to match ChocolateModel dimensions exactly
	 */
	const SHAPE_CONSTANTS = {
		square: { width: 0.25, height: 0.475 }, // Half-width and half-height
		round: { radius: 0.45 }, // Slightly inset from edge
		heart: { scale: 0.32 }, // Scale factor for heart equation
	};

	/**
	 * Mathematical function to determine if a point is inside a heart shape
	 * Using the implicit equation: (x²+y²-1)³-x²y³<0
	 */
	const isInsideHeart = (x: number, z: number): boolean => {
		// Normalize coordinates with respect to heart scale
		const scale = SHAPE_CONSTANTS.heart.scale;
		x = x / scale;
		z = z / scale;

		// Convert z-coordinate to y for heart equation (with offset for better centering)
		const y = -z + 0.4;

		// Classic heart curve equation - mathematical cardioid with adjustment
		return Math.pow(x * x + y * y - 1, 3) - x * x * Math.pow(y, 3) < 0;
	};

	/**
	 * Simple circular boundary check using distance formula
	 */
	const isInsideCircle = (x: number, z: number): boolean => {
		const radius = SHAPE_CONSTANTS.round.radius;
		// Distance from origin must be less than radius
		return x * x + z * z < radius * radius;
	};

	/**
	 * Rectangular boundary check for square chocolate
	 */
	const isInsideSquare = (x: number, z: number): boolean => {
		const halfWidth = SHAPE_CONSTANTS.square.width;
		const halfHeight = SHAPE_CONSTANTS.square.height;
		// Both coordinates must be within the width/height limits
		return Math.abs(x) < halfWidth && Math.abs(z) < halfHeight;
	};

	/**
	 * Dispatches to appropriate shape function based on selected shape
	 */
	const isInside = (x: number, z: number): boolean => {
		switch (shape) {
			case "heart":
				return isInsideHeart(x, z);
			case "round":
				return isInsideCircle(x, z);
			case "square":
				return isInsideSquare(x, z);
			default:
				return isInsideSquare(x, z);
		}
	};

	/**
	 * Core algorithm for generating topping positions
	 * Uses shape-specific distribution strategies and collision detection
	 * to create natural-looking topping placement
	 */
	const generateToppingPositions = (
		count: number,
		toppingType: Topping
	): Array<{
		position: [number, number, number];
		rotation: [number, number, number];
		scale: number;
	}> => {
		const positions = [];
		// More attempts ensure we can place enough toppings even with collisions
		const attempts = count * 30;

		// Configure topping properties based on type
		let baseScale: number;
		let heightOffset: number; // Y-position above chocolate surface

		switch (toppingType) {
			case "nuts":
				baseScale = 0.05;
				heightOffset = 0.08; // Sits slightly higher on surface
				break;
			case "sprinkles":
				baseScale = 0.04; // Smaller for sprinkles
				heightOffset = 0.08;
				break;
			case "fruit":
				baseScale = 0.05;
				heightOffset = 0.09; // Fruits sit higher on surface
				break;
			default:
				baseScale = 0.05;
				heightOffset = 0.08;
		}

		// Shape-specific placement bounds
		let xBound, zBound;
		switch (shape) {
			case "square":
				xBound = SHAPE_CONSTANTS.square.width * 1.8;
				zBound = SHAPE_CONSTANTS.square.height * 1.8;
				break;
			case "round":
				xBound = SHAPE_CONSTANTS.round.radius * 1.8;
				zBound = SHAPE_CONSTANTS.round.radius * 1.8;
				break;
			case "heart":
				// Heart needs tighter bounds to avoid excessive rejection sampling
				xBound = 0.6;
				zBound = 0.5;
				break;
			default:
				xBound = 0.4;
				zBound = 0.4;
		}

		// Placement algorithm with collision detection
		let i = 0;
		while (positions.length < count && i < attempts) {
			i++;

			// Shape-specific coordinate generation strategies
			let x, z;

			if (shape === "heart") {
				// Heart shape needs special distribution rules
				x = (Math.random() * 2 - 1) * xBound;
				// Shift distribution upward for heart shape
				z = (Math.random() * 1.8 - 0.8) * zBound;
			} else if (shape === "round") {
				// Use polar coordinates for even circular distribution
				// Square root of random gives uniform distribution across circle area
				const radius =
					Math.sqrt(Math.random()) * SHAPE_CONSTANTS.round.radius * 0.9;
				const angle = Math.random() * Math.PI * 2;
				x = radius * Math.cos(angle);
				z = radius * Math.sin(angle);
			} else {
				// Uniform distribution for square
				x = (Math.random() - 0.5) * xBound;
				z = (Math.random() - 0.5) * zBound;
			}

			// Skip positions outside the shape boundary
			if (!isInside(x, z)) continue;

			// Collision detection with existing toppings
			let hasOverlap = false;
			// Sprinkles can be placed closer together than other toppings
			const minDistMultiplier = toppingType === "sprinkles" ? 1.5 : 2.2;

			for (const pos of positions) {
				const dx = pos.position[0] - x;
				const dz = pos.position[2] - z;
				const distance = Math.sqrt(dx * dx + dz * dz);
				if (distance < baseScale * minDistMultiplier) {
					hasOverlap = true;
					break;
				}
			}

			if (!hasOverlap) {
				// Add small random variation to scale for natural appearance
				const itemScale = baseScale * (0.9 + Math.random() * 0.2);

				// Apply type-specific scale multipliers
				const scaleMultiplier =
					toppingType === "nuts"
						? 12
						: toppingType === "sprinkles"
						? 10
						: toppingType === "fruit"
						? 11
						: 10;

				positions.push({
					position: [x, heightOffset, z] as [number, number, number],
					// Random rotation for natural variation
					rotation: [
						Math.random() * Math.PI * 2,
						Math.random() * Math.PI * 2,
						Math.random() * Math.PI * 2,
					] as [number, number, number],
					scale: itemScale * scaleMultiplier,
				});
			}
		}

		return positions;
	};

	// Create topping objects with memoization to prevent unnecessary recalculation
	const nutPositions = useMemo(
		() => (toppings.includes("nuts") ? generateToppingPositions(8, "nuts") : []),
		[toppings, shape]
	);

	const sprinklePositions = useMemo(
		() =>
			toppings.includes("sprinkles")
				? generateToppingPositions(15, "sprinkles") // More sprinkles for better coverage
				: [],
		[toppings, shape]
	);

	const fruitPositions = useMemo(
		() =>
			toppings.includes("fruit") ? generateToppingPositions(6, "fruit") : [],
		[toppings, shape]
	);

	if (shouldSkip) {
		return null;
	}

	return (
		<group>
			{nutPositions.map((data, index) => (
				<mesh
					key={`nut-${index}`}
					position={data.position}
					rotation={data.rotation}
					scale={data.scale}>
					<sphereGeometry args={[0.05, 8, 8]} />
					<meshStandardMaterial {...createToppingMaterial("nuts")} />
				</mesh>
			))}

			{sprinklePositions.map((data, index) => (
				<mesh
					key={`sprinkle-${index}`}
					position={data.position}
					rotation={data.rotation}
					scale={[data.scale, data.scale, data.scale * 2.5]}>
					<boxGeometry args={[0.02, 0.02, 0.08]} />
					<meshStandardMaterial {...createToppingMaterial("sprinkles")} />
				</mesh>
			))}

			{fruitPositions.map((data, index) => (
				<mesh
					key={`fruit-${index}`}
					position={data.position}
					rotation={data.rotation}
					scale={data.scale}>
					<sphereGeometry args={[0.06, 16, 16]} />
					<meshStandardMaterial {...createToppingMaterial("fruit")} />
				</mesh>
			))}
		</group>
	);
}
