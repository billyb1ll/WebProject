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
	ChocolateShape,
} from "../../../../hooks/useChocolateConfigurator";
import { formatPrice } from "../../../../utils/func/priceCalculator";
import { useChocolateOptions } from "../../../../hooks/useChocolateOptions";

interface StepThreeProps {
	config: ChocolateConfig;
	updateShape: (shape: ChocolateShape) => void;
}

export default function StepThree({ config, updateShape }: StepThreeProps) {
	// Use the new hook to fetch shapes
	const { shapes, isLoading, isError, error } = useChocolateOptions();

	if (isLoading) {
		return (
			<VStack gap={6} align="stretch">
				<Text color="#604538">Loading shape options...</Text>
				<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
					{[1, 2, 3].map((i) => (
						<Skeleton key={i} height="200px" borderRadius="lg" />
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
						We're having trouble loading shape options. Please check your connection
						or try again later.
					</Text>
				</Box>
			</VStack>
		);
	}

	return (
		<VStack gap={6} align="stretch">
			<Text color="#604538">
				Choose the perfect shape for your chocolate creation.
			</Text>

			<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
				{shapes.map(({ id, type, name, description, imageUrl, price }) => (
					<Box
						key={id}
						onClick={() => updateShape(type)}
						borderWidth="2px"
						borderRadius="lg"
						borderColor={config.shape === type ? "#A47864" : "transparent"}
						overflow="hidden"
						boxShadow="md"
						cursor="pointer"
						transition="all 0.3s ease"
						_hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
						bg={config.shape === type ? "#F5F0E8" : "white"}
						height="100%"
						display="flex"
						flexDirection="column">
						<Box position="relative" flex="0 0 120px">
							<Image
								src={imageUrl}
								onError={(e) => {
									(
										e.target as HTMLImageElement
									).src = `https://via.placeholder.com/200x120?text=${name}`;
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
								{price === 0 ? "Standard" : `+${formatPrice(price)}`}
							</Badge>
							{config.shape === type && (
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
							<Heading
								as="h3"
								size="sm"
								mb={1}
								color="#604538"
								fontSize="md"
								display="flex"
								justifyContent="space-between">
								{name}
							</Heading>
							<Text fontSize="xs" color="gray.600">
								{description}
							</Text>
						</Box>
					</Box>
				))}
			</SimpleGrid>
		</VStack>
	);
}
