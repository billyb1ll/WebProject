import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import {
	Box,
	Text,
	Badge,
	VStack,
	Flex,
	useBreakpointValue,
	IconButton,
} from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import ChocolateModel from "./models/ChocolateModel";
import ToppingsModel from "./models/ToppingsModel";
import { ChocolateConfig } from "../../../hooks/useChocolateConfigurator";
import {
	calculatePrice,
	formatPrice,
} from "../../../utils/func/priceCalculator";
import { FaSun, FaMoon } from "react-icons/fa";

// Separate component for the rotating chocolate scene
function RotatingChocolateScene({ config }: { config: ChocolateConfig }) {
	const groupRef = useRef<THREE.Group | null>(null);

	// Add rotation to the whole chocolate group
	useFrame(() => {
		if (groupRef.current) {
			groupRef.current.rotation.y += 0.005;
		}
	});

	return (
		// Remove the hardcoded scale here to avoid double scaling
		<group ref={groupRef} position={[0, 0, 0]}>
			<ChocolateModel config={config} />
			<ToppingsModel toppings={config.toppings} shape={config.shape} />
		</group>
	);
}

interface ChocolateViewerProps {
	config: ChocolateConfig;
}

export default function ChocolateViewer({ config }: ChocolateViewerProps) {
	// Add state to force re-renders when config changes
	const [key, setKey] = useState(0);
	// State for enhanced lighting control
	const [enhancedLighting, setEnhancedLighting] = useState(true);

	// Calculate price based on current config
	const { subtotal, details } = calculatePrice(config);

	// Adjust responsive controls with smaller scale values
	const modelScale = useBreakpointValue({ base: 1.2, md: 1.5 }) || 1.3;
	const isMobile = useBreakpointValue({ base: true, md: false });

	// Force re-render when config changes to ensure model updates
	useEffect(() => {
		setKey((prev) => prev + 1);
	}, [config]);

	// Toggle lighting effects function
	const toggleLightingEffects = () => setEnhancedLighting(!enhancedLighting);

	return (
		<VStack gap={{ base: 3, md: 5 }} align="stretch" width="100%">
			<Box
				width="100%"
				maxWidth={{ base: "100%", md: "600px" }}
				height={{ base: "250px", sm: "300px", md: "400px" }}
				borderRadius="md"
				overflow="hidden"
				bg={enhancedLighting ? "#F8F5F2" : "#E8E8E8"}
				position="relative"
				transition="background 0.3s">
				<Canvas key={key} shadows camera={{ position: [0, 1.5, 2.2], fov: 35 }}>
					<Suspense fallback={null}>
						{/* Base lighting remains the same in both modes */}
						<ambientLight intensity={0.5} />
						<directionalLight
							position={[10, 10, 5]}
							intensity={0.9}
							castShadow={enhancedLighting}
							shadow-mapSize={[1024, 1024]}
						/>
						<directionalLight position={[-5, -5, 5]} intensity={0.5} />

						{/* Use the adjusted model scale */}
						<group scale={modelScale}>
							<RotatingChocolateScene config={config} />
						</group>

						{/* Only add ContactShadows when enhanced lighting is on */}
						{enhancedLighting && (
							<ContactShadows
								opacity={0.4}
								scale={8}
								blur={2}
								far={4}
								resolution={256}
								color="#000000"
							/>
						)}

						{/* Change environment preset based on lighting mode */}
						<Environment preset={enhancedLighting ? "studio" : "city"} />
						<OrbitControls
							enableZoom={true}
							enablePan={false}
							minPolarAngle={Math.PI / 6}
							maxPolarAngle={Math.PI / 2}
							rotateSpeed={1.5}
							zoomSpeed={1.2}
							enableDamping={true}
							dampingFactor={0.2}
						/>
					</Suspense>
				</Canvas>

				{/* Lighting effects toggle button */}
				<Tooltip
					content={enhancedLighting ? "Basic lighting" : "Enhanced lighting"}>
					<IconButton
						aria-label="Toggle lighting effects"
						position="absolute"
						top={2}
						right={2}
						size="sm"
						colorScheme={enhancedLighting ? "gray" : "yellow"}
						bg={enhancedLighting ? "blackAlpha.600" : "whiteAlpha.800"}
						color={enhancedLighting ? "white" : "gray.800"}
						_hover={{
							bg: enhancedLighting ? "blackAlpha.700" : "yellow.100",
						}}
						onClick={toggleLightingEffects}>
						{enhancedLighting ? <FaMoon /> : <FaSun />}
					</IconButton>
				</Tooltip>

				{/* 3D instructions overlay */}
				<Box
					position="absolute"
					bottom={2}
					right={2}
					bg="blackAlpha.600"
					color="white"
					fontSize="xs"
					p={1}
					borderRadius="md">
					{isMobile ? "Touch to rotate • Pinch to zoom" : "Drag to rotate"}
				</Box>
			</Box>

			{/* Configuration summary with price */}
			<Box
				p={{ base: 3, md: 4 }}
				bg="white"
				boxShadow="md"
				overflow="hidden"
				rounded="md"
				width="100%"
				maxWidth={{ base: "100%", md: "600px" }}
				borderRadius="md"
				borderWidth={1}
				borderColor="#E8DDD8">
				<Flex
					justifyContent="space-between"
					alignItems="center"
					mb={2}
					direction={{ base: "column", sm: "row" }}
					gap={{ base: 1, sm: 0 }}>
					<Text fontWeight="bold" color="#604538">
						Your Chocolate Creation
					</Text>
					<Text fontWeight="bold" fontSize="lg" color="#604538">
						{formatPrice(subtotal)}
					</Text>
				</Flex>

				<Flex wrap="wrap" gap={2} mb={3}>
					<Badge colorScheme="brown" bg="#A47864" color="white">
						{config.chocolateType} chocolate
					</Badge>
					<Badge colorScheme="orange" bg="#F5F0E8" color="#604538">
						{config.shape} shape
					</Badge>
					{config.toppings.length > 0 ? (
						config.toppings.map((topping) => (
							<Badge key={topping} colorScheme="green" bg="#F5F0E8" color="#604538">
								{topping} topping
							</Badge>
						))
					) : (
						<Badge colorScheme="gray" bg="#F5F0E8" color="#604538">
							No toppings
						</Badge>
					)}
					<Badge colorScheme="purple" bg="#F5F0E8" color="#604538">
						{config.packaging} packaging
					</Badge>
					{config.message && (
						<Badge colorScheme="blue" bg="#F5F0E8" color="#604538">
							With message
						</Badge>
					)}
				</Flex>

				<Flex my={2} />
				{/* Price breakdown - modified for better mobile display */}
				<VStack align="stretch" fontSize={{ base: "2xs", sm: "xs" }} gap={1}>
					<Tooltip content="Base chocolate price">
						<Flex justify="space-between">
							<Text>Base ({config.chocolateType}):</Text>
							<Text>{formatPrice(details.base)}</Text>
						</Flex>
					</Tooltip>

					{details.shape > 0 && (
						<Tooltip content="Additional cost for shape">
							<Flex justify="space-between">
								<Text>Shape ({config.shape}):</Text>
								<Text>+{formatPrice(details.shape)}</Text>
							</Flex>
						</Tooltip>
					)}

					{details.toppings > 0 && (
						<Tooltip content="Cost for selected toppings">
							<Flex justify="space-between">
								<Text>Toppings:</Text>
								<Text>+{formatPrice(details.toppings)}</Text>
							</Flex>
						</Tooltip>
					)}

					{details.packaging > 0 && (
						<Tooltip content="Packaging upgrade cost">
							<Flex justify="space-between">
								<Text>Packaging ({config.packaging}):</Text>
								<Text>+{formatPrice(details.packaging)}</Text>
							</Flex>
						</Tooltip>
					)}

					{details.message > 0 && (
						<Tooltip content="Custom message fee">
							<Flex justify="space-between">
								<Text>Custom message:</Text>
								<Text>+{formatPrice(details.message)}</Text>
							</Flex>
						</Tooltip>
					)}
				</VStack>
			</Box>
		</VStack>
	);
}
