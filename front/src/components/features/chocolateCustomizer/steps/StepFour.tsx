import React from "react";
import {
	Box,
	Text,
	SimpleGrid,
	VStack,
	Image,
	Heading,
	Badge,
} from "@chakra-ui/react";
import {
	ChocolateConfig,
	PackagingType,
} from "../../../../hooks/useChocolateConfigurator";
import { formatPrice } from "../../../../utils/priceCalculator";

interface StepFourProps {
	config: ChocolateConfig;
	updatePackaging: (packaging: PackagingType) => void;
}

export default function StepFour({ config, updatePackaging }: StepFourProps) {
	const packagingOptions: {
		type: PackagingType;
		label: string;
		description: string;
		price: number;
		image: string;
		features: string[];
	}[] = [
		{
			type: "standard",
			label: "Standard Box",
			description: "Simple and elegant packaging for everyday gifting.",
			price: 0,
			image: "/images/packaging-standard.jpg",
			features: ["Brown kraft box", "Recyclable", "Simple design"],
		},
		{
			type: "gift",
			label: "Gift Package",
			description: "Beautiful box with ribbon for special occasions.",
			price: 3.99,
			image: "/images/packaging-gift.jpg",
			features: ["Satin ribbon", "Gift tag", "Elegant design"],
		},
		{
			type: "premium",
			label: "Premium Box",
			description: "Luxury wooden box with gold accents for memorable gifts.",
			price: 8.99,
			image: "/images/packaging-premium.jpg",
			features: ["Wooden box", "Gold foil accents", "Magnetic closure"],
		},
		{
			type: "eco",
			label: "Eco-Friendly",
			description:
				"Biodegradable packaging for environmentally conscious choices.",
			price: 1.99,
			image: "/images/packaging-eco.jpg",
			features: ["100% biodegradable", "Plant-based materials", "Zero plastic"],
		},
	];

	return (
		<VStack gap={6} align="stretch">
			<Text color="#604538">
				Select the perfect packaging for your chocolate creation.
			</Text>

			<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
				{packagingOptions.map(
					({ type, label, description, price, image, features }) => (
						<Box
							key={type}
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
									src={image}
									onError={(e) => {
										(
											e.target as HTMLImageElement
										).src = `https://via.placeholder.com/300x120?text=${label}`;
									}}
									alt={label}
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
									{label}
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
