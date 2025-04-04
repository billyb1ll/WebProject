import React, { useState, useEffect } from "react";
import {
	Box,
	Text,
	SimpleGrid,
	VStack,
	Image,
	Heading,
	Badge,
	Skeleton,
} from "@chakra-ui/react";

import {
	ChocolateConfig,
	ChocolateType,
} from "../../../../hooks/useChocolateConfigurator";
import { formatPrice } from "../../../../utils/priceCalculator";

interface StepOneProps {
	config: ChocolateConfig;
	updateType: (type: ChocolateType) => void;
}

// Mock function to simulate fetching from database
// In real app, this would be an API call to your backend
async function fetchChocolateTypesFromDB() {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 500));

	// This data would come from your database
	return [
		{
			type: "dark",
			label: "Dark Chocolate",
			description:
				"Rich and intense with 70% cocoa content. Perfect for those who appreciate a robust chocolate flavor with minimal sweetness.",
			image: "/images/chocolate-dark.jpg",
			price: 6.99,
			product_id: 1, // This would be your database ID
		},
		{
			type: "milk",
			label: "Milk Chocolate",
			description:
				"Smooth and creamy classic favorite. A perfect balance of sweetness and chocolate flavor that everyone loves.",
			image: "/images/chocolate-milk.jpg",
			price: 5.99,
			product_id: 2,
		},
		{
			type: "white",
			label: "White Chocolate",
			description:
				"Sweet and buttery with vanilla notes. A delicate flavor profile with a smooth, melt-in-your-mouth texture.",
			image: "/images/chocolate-white.jpg",
			price: 7.99,
			product_id: 3,
		},
	];
}

export default function StepOne({ config, updateType }: StepOneProps) {
	const [chocolateTypes, setChocolateTypes] = useState<
		{
			type: ChocolateType;
			label: string;
			description: string;
			image: string;
			price: number;
			product_id: number;
		}[]
	>([]);
	const [loading, setLoading] = useState(true);

	// Simulate fetching data from database
	useEffect(() => {
		async function loadData() {
			try {
				const data = await fetchChocolateTypesFromDB();
				setChocolateTypes(
					data.map((item) => ({
						...item,
						type: item.type as ChocolateType,
					}))
				);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching chocolate types:", error);
				setLoading(false);
			}
		}

		loadData();
	}, []);

	if (loading) {
		return (
			<VStack gap={6} align="stretch">
				<Text color="#604538">Loading chocolate options...</Text>
				<SimpleGrid columns={{ base: 1, md: 3 }} gap={3}>
					{[1, 2, 3].map((i) => (
						<Skeleton key={i} height="300px" borderRadius="lg" />
					))}
				</SimpleGrid>
			</VStack>
		);
	}

	return (
		<VStack gap={6} align="stretch">
			<Text color="#604538">
				Choose your chocolate base. This will determine the flavor profile of your
				creation.
			</Text>

			<SimpleGrid columns={{ base: 1, md: 3 }} gap={3}>
				{chocolateTypes.map(
					({ type, label, description, image, price, product_id }) => (
						<Box
							key={product_id}
							onClick={() => updateType(type)}
							borderWidth="2px"
							borderRadius="lg"
							borderColor={config.chocolateType === type ? "#A47864" : "transparent"}
							overflow="hidden"
							boxShadow="md"
							cursor="pointer"
							transition="all 0.3s ease"
							_hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
							bg={config.chocolateType === type ? "#F5F0E8" : "white"}
							height="100%"
							display="flex"
							flexDirection="column">
							<Box position="relative">
								<Image
									src={image}
									onError={(e) => {
										(
											e.target as HTMLImageElement
										).src = `https://via.placeholder.com/300x150?text=${label}`;
									}}
									alt={label}
									width="100%"
									height="150px"
									objectFit="cover"
								/>
								{/* Add price badge in top-left corner */}
								<Badge
									position="absolute"
									top={2}
									left={2}
									bg="blue.500"
									color="white"
									px={2}
									py={1}
									borderRadius="md">
									{formatPrice(price)}
								</Badge>
								{config.chocolateType === type && (
									<Badge
										position="absolute"
										top={2}
										right={2}
										bg="#A47864"
										color="white"
										px={2}
										py={1}
										borderRadius="md">
										Selected
									</Badge>
								)}
							</Box>
							<Box p={4} flex="1">
								<Heading
									as="h3"
									size="sm"
									mb={2}
									color="#604538"
									fontSize="md"
									display="flex"
									justifyContent="space-between">
									{label}
								</Heading>
								<Text fontSize="sm" color="gray.600">
									{description}
								</Text>
							</Box>
						</Box>
					)
				)}
			</SimpleGrid>
		</VStack>
	);
}
