import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { ChocolateConfig } from "../../../../hooks/useChocolateConfigurator";
import { createChocolateMaterial } from "../../../../utils/3d/materialUtils";
import ToppingsModel from "./ToppingsModel";

interface ChocolateModelProps {
	config: ChocolateConfig;
}

export default function ChocolateModel({ config }: ChocolateModelProps) {
	const groupRef = useRef<THREE.Group>(null);
	const { shape, chocolateType, toppings } = config;

	// Create heart shape using Three.js Shape with better proportions
	const heartShape = useMemo(() => {
		const shape = new THREE.Shape();

		// Adjusted heart shape for better proportions
		shape.moveTo(0, 0.25); // Starting point at top center
		shape.bezierCurveTo(0, 0.35, 0.35, 0.35, 0.35, 0.25); // Right top curve
		shape.bezierCurveTo(0.35, 0.1, 0, 0, 0, -0.15); // Right side to bottom
		shape.bezierCurveTo(0, 0, -0.35, 0.1, -0.35, 0.25); // Left side from bottom
		shape.bezierCurveTo(-0.35, 0.35, 0, 0.35, 0, 0.25); // Left top curve

		return shape;
	}, []);

	// Create extrude settings for heart with normalized thickness
	const extrudeSettings = useMemo(() => {
		return {
			depth: 0.15, // Slightly thinner for better proportions
			bevelEnabled: true,
			bevelSegments: 3, // More segments for smoother edges
			bevelSize: 0.015,
			bevelThickness: 0.015,
		};
	}, []);

	// Material based on chocolate type
	const material = useMemo(() => {
		const matProps = createChocolateMaterial(chocolateType);
		return new THREE.MeshStandardMaterial({
			color: matProps.color,
			roughness: matProps.roughness,
			metalness: matProps.metalness,
		});
	}, [chocolateType]);

	// Get geometry based on the shape with normalized dimensions
	const geometry = useMemo(() => {
		switch (shape) {
			case "heart":
				return new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
			case "round":
				return new THREE.CylinderGeometry(0.5, 0.5, 0.15, 32); // Reduced radius from 0.6 to 0.5, height from 0.2 to 0.15
			case "square":
			default:
				return new THREE.BoxGeometry(0.9, 0.15, 0.9); // Reduced from 1x0.2x1 to 0.9x0.15x0.9
		}
	}, [shape, heartShape, extrudeSettings]);

	// Apply rotation adjustments based on shape
	const getRotation = (): [number, number, number] => {
		switch (shape) {
			case "heart":
				return [Math.PI, 0, Math.PI]; // Flip and rotate heart for proper orientation
			case "round":
				return [0, 0, 0];
			default:
				return [0, 0, 0];
		}
	};

	return (
		<group ref={groupRef}>
			{/* The chocolate base with adjusted rotation */}
			<mesh
				castShadow
				receiveShadow
				geometry={geometry}
				material={material}
				rotation={getRotation()}
				position={[0, 0, 0]} // Ensure base position is at origin
			/>

			{/* Toppings get placed on top of the chocolate, in the same group */}
			<ToppingsModel toppings={toppings} shape={shape} />
		</group>
	);
}
