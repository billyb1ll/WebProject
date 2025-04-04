import React from "react";
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
	Topping,
} from "../../../../hooks/useChocolateConfigurator";
import { formatPrice } from "../../../../utils/func/priceCalculator";
import { useChocolateOptions } from "../../../../hooks/useChocolateOptions";

interface StepTwoProps {
	config: ChocolateConfig;
	toggleTopping: (topping: Topping) => void;
}

export default function StepTwo({ config, toggleTopping }: StepTwoProps) {
	// Use the new hook to fetch toppings
	const { toppings, isLoading, isError, error } = useChocolateOptions();

	if (isLoading) {
		return (
			<VStack gap={6} align="stretch">
				<Text color="#604538">Loading topping options...</Text>
				<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
					{[1, 2, 3, 4].map((i) => (
						<Skeleton key={i} height="180px" borderRadius="lg" />
					))}
				</SimpleGrid>
			</VStack>
		);
	}

	if (isError) {
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
						We're having trouble loading topping options. Please check your connection
						or try again later.
					</Text>
				</Box>
			</VStack>
		);
	}

	return (
		<VStack gap={6} align="stretch">
			<Text color="#604538">
				Select your favorite toppings. You can choose multiple options or none for a
				pure chocolate experience.
			</Text>

			<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
				{toppings.map(({ id, type, name, description, imageUrl, price }) => {
					const isSelected =
						type === "none"
							? config.toppings.length === 0 || config.toppings.includes("none")
							: config.toppings.includes(type);

					return (
						<Box
							key={id}
							borderWidth="2px"
							borderRadius="lg"
							borderColor={isSelected ? "#A47864" : "transparent"}
							overflow="hidden"
							boxShadow="md"
							cursor="pointer"
							transition="all 0.3s ease"
							_hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
							bg={isSelected ? "#F5F0E8" : "white"}
							onClick={() => toggleTopping(type)}>
							<Box position="relative" height="100px">
								<Image
									src={imageUrl}
									onError={(e) => {
										(
											e.target as HTMLImageElement
										).src = `https://via.placeholder.com/200x100?text=${name}`;
									}}
									alt={name}
									width="100%"
									height="100%"
									objectFit="cover"
								/>
								{/* Add price badge in top-left corner */}
								<Badge
									position="absolute"
									top={2}
									left={2}
									bg={price === 0 ? "green.500" : "orange.500"}
									color="white"
									px={2}
									py={1}
									borderRadius="md">
									{price === 0 ? "Free" : `+${formatPrice(price)}`}
								</Badge>
								{isSelected && (
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
							<Box p={3}>
								<Heading as="h3" size="sm" mb={1} color="#604538" fontSize="md">
									{name}
								</Heading>
								<Text fontSize="xs" color="gray.600">
									{description}
								</Text>
							</Box>
						</Box>
					);
				})}
			</SimpleGrid>

			<Text fontSize="sm" color="gray.600" mt={2}>
				* You can select multiple toppings to create your perfect combination
			</Text>
		</VStack>
	);
}
