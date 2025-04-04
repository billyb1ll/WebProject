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
	Topping,
} from "../../../../hooks/useChocolateConfigurator";
import { formatPrice } from "../../../../utils/priceCalculator";

interface StepTwoProps {
	config: ChocolateConfig;
	toggleTopping: (topping: Topping) => void;
}

export default function StepTwo({ config, toggleTopping }: StepTwoProps) {
	const toppings: {
		type: Topping;
		label: string;
		description: string;
		image: string;
		price: number;
	}[] = [
		{
			type: "none",
			label: "No Toppings",
			description:
				"Pure chocolate experience with no added ingredients. Enjoy the authentic taste of our premium chocolate.",
			image: "/images/topping-none.jpg",
			price: 0,
		},
		{
			type: "nuts",
			label: "Mixed Nuts",
			description:
				"Almonds, hazelnuts, and pecans. A perfect combination of crunchy nuts that complement the smooth chocolate.",
			image: "/images/topping-nuts.jpg",
			price: 1.99,
		},
		{
			type: "sprinkles",
			label: "Colorful Sprinkles",
			description:
				"Fun and festive decoration that adds a pop of color and a slight crunch to your chocolate creation.",
			image: "/images/topping-sprinkles.jpg",
			price: 0.99,
		},
		{
			type: "fruit",
			label: "Dried Fruits",
			description:
				"Berries and citrus zest that add a natural sweetness and tangy flavor to complement the chocolate.",
			image: "/images/topping-fruit.jpg",
			price: 1.49,
		},
	];

	return (
		<VStack gap={6} align="stretch">
			<Text color="#604538">
				Select your favorite toppings. You can choose multiple options or none for a
				pure chocolate experience.
			</Text>

			<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
				{toppings.map(({ type, label, description, image, price }) => {
					const isSelected =
						type === "none"
							? config.toppings.length === 0 || config.toppings.includes("none")
							: config.toppings.includes(type);

					return (
						<Box
							key={type}
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
									src={image}
									onError={(e) => {
										(e.target as HTMLImageElement).src = "/images/fallback.jpg";
									}}
									alt={label}
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
									{label}
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
