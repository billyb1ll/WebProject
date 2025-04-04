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

export default function ToppingsModel({ toppings, shape }: ToppingsModelProps) {
	// Skip if no toppings or only "none"
	const shouldSkip = toppings.includes("none") || toppings.length === 0;

	// Normalized constants for shape dimensions
	const SHAPE_CONSTANTS = {
		square: { width: 0.45, height: 0.45 }, // Half dimensions of the square
		round: { radius: 0.5 }, // Radius of the circle
		heart: { scale: 0.35 }, // Scale factor for heart equation
	};

	// Function to check if a point is inside the heart shape (improved formula)
	const isInsideHeart = (x: number, z: number): boolean => {
		// Normalize coordinates based on shape scale
		const scale = SHAPE_CONSTANTS.heart.scale;
		x = x / scale;
		z = z / scale;

		// For heart shape, we need to flip the y coordinate and adjust position
		const y = -z + 0.4; // Adjust y-offset to center the heart properly

		// More accurate heart equation: (x^2 + y^2 - 1)^3 - x^2*y^3 < 0
		return Math.pow(x * x + y * y - 1, 3) - x * x * Math.pow(y, 3) < 0;
	};

	// Function to check if a point is inside the round shape
	const isInsideCircle = (x: number, z: number): boolean => {
		const radius = SHAPE_CONSTANTS.round.radius - 0.05; // Slight inset to keep toppings away from edge
		return x * x + z * z < radius * radius;
	};

	// Function to check if a point is inside the square shape
	const isInsideSquare = (x: number, z: number): boolean => {
		const halfWidth = SHAPE_CONSTANTS.square.width;
		const halfHeight = SHAPE_CONSTANTS.square.height;
		return Math.abs(x) < halfWidth && Math.abs(z) < halfHeight;
	};

	// Function to check if a point is inside the selected shape
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

	// Generate positions for toppings with adjusted scales
	const generateToppingPositions = (
		count: number,
		toppingType: Topping
	): Array<{
		position: [number, number, number];
		rotation: [number, number, number];
		scale: number;
	}> => {
		const positions: Array<{
			position: [number, number, number];
			rotation: [number, number, number];
			scale: number;
		}> = [];
		const attempts = count * 20; // Max attempts to prevent infinite loops

		// Properly scale toppings for each type
		let baseScale: number;
		let heightOffset: number;

		switch (toppingType) {
			case "nuts":
				baseScale = 0.6; // Smaller nuts (was 0.8-1.2 before)
				heightOffset = 0.08; // Position at correct height
				break;
			case "sprinkles":
				baseScale = 0.4; // Smaller sprinkles
				heightOffset = 0.08;
				break;
			case "fruit":
				baseScale = 0.55; // Slightly smaller fruit pieces
				heightOffset = 0.09;
				break;
			default:
				baseScale = 0.5;
				heightOffset = 0.08;
		}

		// Try to place toppings
		let i = 0;
		while (positions.length < count && i < attempts) {
			i++;

			// Generate random position within bounds
			const x = (Math.random() - 0.5) * 1.2;
			const z = (Math.random() - 0.5) * 1.2;

			// Check if position is valid
			if (!isInside(x, z)) continue;

			// Check for overlap with existing toppings
			let hasOverlap = false;
			for (const pos of positions) {
				const dx = pos.position[0] - x;
				const dz = pos.position[2] - z;
				const distance = Math.sqrt(dx * dx + dz * dz);
				if (distance < baseScale * 2.5) {
					hasOverlap = true;
					break;
				}
			}

			// Modified position logic to adjust the y position to the correct height above the chocolate
			if (!hasOverlap) {
				// Calculate scale with less randomness for more consistency
				const itemScale = baseScale + Math.random() * 0.2;
				positions.push({
					position: [x, heightOffset, z], // Use the specific height offset
					rotation: [
						Math.random() * Math.PI * 2,
						Math.random() * Math.PI * 2,
						Math.random() * Math.PI * 2,
					],
					scale: itemScale,
				});
			}
		}

		return positions;
	};

	// Create topping objects
	const nutPositions = useMemo(
		() => (toppings.includes("nuts") ? generateToppingPositions(8, "nuts") : []),
		[toppings, shape]
	);

	const sprinklePositions = useMemo(
		() =>
			toppings.includes("sprinkles")
				? generateToppingPositions(15, "sprinkles")
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
					<sphereGeometry args={[0.05, 8, 8]} /> {/* Reduced from 0.06 */}
					<meshStandardMaterial {...createToppingMaterial("nuts")} />
				</mesh>
			))}

			{/* Sprinkles with adjusted sizes */}
			{sprinklePositions.map((data, index) => (
				<mesh
					key={`sprinkle-${index}`}
					position={data.position}
					rotation={data.rotation}
					scale={[data.scale, data.scale, data.scale * 2.5]}>
					{" "}
					{/* Reduced from 3x to 2.5x */}
					<boxGeometry args={[0.02, 0.02, 0.08]} />{" "}
					{/* Reduced from 0.03, 0.03, 0.1 */}
					<meshStandardMaterial {...createToppingMaterial("sprinkles")} />
				</mesh>
			))}

			{/* Fruit pieces with adjusted sizes */}
			{fruitPositions.map((data, index) => (
				<mesh
					key={`fruit-${index}`}
					position={data.position}
					rotation={data.rotation}
					scale={data.scale}>
					<sphereGeometry args={[0.06, 16, 16]} /> {/* Reduced from 0.08 */}
					<meshStandardMaterial {...createToppingMaterial("fruit")} />
				</mesh>
			))}
		</group>
	);
}
