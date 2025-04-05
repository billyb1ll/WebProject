import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { ChocolateConfig } from "../../../../hooks/useChocolateConfigurator";
import { createChocolateMaterial } from "../../../../utils/3d/materialUtils";
import ToppingsModel from "./ToppingsModel";

interface ChocolateModelProps {
	config: ChocolateConfig;
}

/**
 * ChocolateModel renders the 3D chocolate base with proper geometry and material
 * based on the selected configuration. It handles different shapes (heart, round, square)
 * and chocolate types (dark, milk, white).
 */
export default function ChocolateModel({ config }: ChocolateModelProps) {
	const groupRef = useRef<THREE.Group>(null);
	const { shape, chocolateType, toppings } = config;

	/**
	 * Heart shape generation using Bezier curves
	 * The coordinates are carefully chosen to create a balanced, symmetrical heart
	 * that looks natural when extruded into 3D
	 */
	const heartShape = useMemo(() => {
		const shape = new THREE.Shape();

		// Starting at top center and drawing curves to create heart lobes
		shape.moveTo(0, 0.25); // Starting point at top center
		shape.bezierCurveTo(0, 0.35, 0.35, 0.35, 0.35, 0.25); // Right top curve
		shape.bezierCurveTo(0.35, 0.1, 0, 0, 0, -0.15); // Right side to bottom
		shape.bezierCurveTo(0, 0, -0.35, 0.1, -0.35, 0.25); // Left side from bottom
		shape.bezierCurveTo(-0.35, 0.35, 0, 0.35, 0, 0.25); // Left top curve

		return shape;
	}, []);

	/**
	 * Extrusion settings for the heart shape
	 * Bevel parameters create the rounded edges typical of molded chocolate
	 */
	const extrudeSettings = useMemo(() => {
		return {
			depth: 0.15, // Thickness of chocolate piece
			bevelEnabled: true,
			bevelSegments: 3, // More segments = smoother edges but higher polygon count
			bevelSize: 0.015, // Size of beveled edge
			bevelThickness: 0.015, // Depth of bevel
		};
	}, []);

	/**
	 * Create material based on chocolate type with appropriate
	 * physical properties (color, roughness, metalness)
	 */
	const material = useMemo(() => {
		const matProps = createChocolateMaterial(chocolateType);
		return new THREE.MeshStandardMaterial({
			color: matProps.color,
			roughness: matProps.roughness, // Controls how matte/glossy the surface appears
			metalness: matProps.metalness, // Lower value gives more plastic/organic appearance
		});
	}, [chocolateType]);

	/**
	 * Generate appropriate geometry based on the selected shape
	 * All shapes are normalized to have similar volume/presence in the scene
	 */
	const geometry = useMemo(() => {
		switch (shape) {
			case "heart":
				return new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
			case "round":
				// CylinderGeometry creates a disc with many segments for smooth edges
				return new THREE.CylinderGeometry(0.5, 0.5, 0.05, 32);
			case "square":
			default:
				// BoxGeometry dimensions: width × height × depth
				return new THREE.BoxGeometry(0.5, 0.05, 0.95);
		}
	}, [shape, heartShape, extrudeSettings]);

	/**
	 * Apply rotation adjustments to ensure all shapes are oriented correctly
	 * Heart shape in particular needs flipping to match expected orientation
	 */
	const getRotation = (): [number, number, number] => {
		switch (shape) {
			case "heart":
				// PI rotation around X and Z axes to flip and orient correctly
				return [Math.PI, 0, Math.PI];
			case "round":
			default:
				return [0, 0, 0];
		}
	};

	return (
		<group ref={groupRef}>
			<mesh
				castShadow
				receiveShadow
				geometry={geometry}
				material={material}
				rotation={getRotation()}
				position={[0, 0, 0]}
			/>
			{/* Toppings get placed on top of the chocolate, in the same group */}
			<ToppingsModel toppings={toppings} shape={shape} />
		</group>
	);
}
