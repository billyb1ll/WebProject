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
import { formatPrice } from "../../../../utils/func/priceCalculator";
import {
	chocolateApi,
	ChocolateOption,
} from "../../../../services/api/chocolateApi";

interface StepOneProps {
	config: ChocolateConfig;
	updateType: (type: ChocolateType) => void;
}

export default function StepOne({ config, updateType }: StepOneProps) {
	const [chocolateTypes, setChocolateTypes] = useState<ChocolateOption[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch chocolate types from the API service
	useEffect(() => {
		async function loadData() {
			try {
				setLoading(true);
				const data = await chocolateApi.getChocolateTypes();
				setChocolateTypes(data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching chocolate types:", error);
				setError("Failed to load chocolate options. Please try again.");
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

	if (error) {
		return (
			<VStack gap={6} align="stretch">
				<Text color="red.500">{error}</Text>
				<Box
					p={4}
					bg="red.50"
					borderRadius="md"
					borderWidth={1}
					borderColor="red.200">
					<Text>
						We're having trouble connecting to our servers. Please check your
						connection or try again later.
					</Text>
				</Box>
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
