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
	PackagingType,
} from "../../../../hooks/useChocolateConfigurator";
import { formatPrice } from "../../../../utils/func/priceCalculator";
import { useChocolateOptions } from "../../../../hooks/useChocolateOptions";

interface StepFourProps {
	config: ChocolateConfig;
	updatePackaging: (packaging: PackagingType) => void;
}

export default function StepFour({ config, updatePackaging }: StepFourProps) {
	// Use the new hook to fetch packaging options
	const { packagingOptions, isLoading, isError, error } = useChocolateOptions();

	if (isLoading) {
		return (
			<VStack gap={6} align="stretch">
				<Text color="#604538">Loading packaging options...</Text>
				<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
					{[1, 2, 3, 4].map((i) => (
						<Skeleton key={i} height="220px" borderRadius="lg" />
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
						We're having trouble loading packaging options. Please check your
						connection or try again later.
					</Text>
				</Box>
			</VStack>
		);
	}

	return (
		<VStack gap={6} align="stretch">
			<Text color="#604538">
				Select the perfect packaging for your chocolate creation.
			</Text>

			<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
				{packagingOptions.map(
					({ id, type, name, description, price, imageUrl, features }) => (
						<Box
							key={id}
							onClick={() => updatePackaging(type)}
							borderWidth="2px"
							borderRadius="lg"
							borderColor={config.packaging === type ? "#A47864" : "transparent"}
							overflow="hidden"
							boxShadow="md"
							cursor="pointer"
							transition="all 0.3s ease"
							_hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
							bg={config.packaging === type ? "#F5F0E8" : "white"}
							height="100%"
							display="flex"
							flexDirection="column">
							<Box position="relative">
								<Image
									src={imageUrl}
									onError={(e) => {
										(
											e.target as HTMLImageElement
										).src = `https://via.placeholder.com/300x120?text=${name}`;
									}}
									alt={name}
									width="100%"
									height="120px"
									objectFit="cover"
								/>
								<Badge
									position="absolute"
									top={2}
									left={2}
									bg={price === 0 ? "green.500" : "orange.500"}
									color="white"
									px={2}
									py={1}
									borderRadius="md">
									{price === 0 ? "Included" : `+${formatPrice(price)}`}
								</Badge>
								{config.packaging === type && (
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
							<Box p={3} flex="1">
								<Heading as="h3" size="sm" mb={1} color="#604538" fontSize="md">
									{name}
								</Heading>
								<Text fontSize="xs" color="gray.600" mb={2}>
									{description}
								</Text>
								<Box>
									{features.map((feature, index) => (
										<Badge
											key={index}
											mr={1}
											mb={1}
											variant="subtle"
											colorScheme="brown"
											fontSize="10px">
											{feature}
										</Badge>
									))}
								</Box>
							</Box>
						</Box>
					)
				)}
			</SimpleGrid>
		</VStack>
	);
}
