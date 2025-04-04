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
	ChocolateShape,
} from "../../../../hooks/useChocolateConfigurator";
import { formatPrice } from "../../../../utils/priceCalculator";

interface StepThreeProps {
	config: ChocolateConfig;
	updateShape: (shape: ChocolateShape) => void;
}

export default function StepThree({ config, updateShape }: StepThreeProps) {
	const shapes: {
		type: ChocolateShape;
		label: string;
		description: string;
		image: string;
		price: number;
	}[] = [
		{
			type: "square",
			label: "Classic Square",
			description:
				"Traditional and elegant design. Perfect for gifting and sharing with friends and family.",
			image: "/images/shape-square.jpg",
			price: 0,
		},
		{
			type: "round",
			label: "Elegant Round",
			description:
				"Smooth edges, perfect for gifting. A timeless shape that represents unity and perfection.",
			image: "/images/shape-round.jpg",
			price: 1.5,
		},
		{
			type: "heart",
			label: "Romantic Heart",
			description:
				"Express your feelings with this shape. Ideal for anniversaries, Valentine's Day, or to show someone you care.",
			image: "/images/shape-heart.jpg",
			price: 2.5,
		},
	];

	return (
		<VStack gap={6} align="stretch">
			<Text color="#604538">
				Choose the perfect shape for your chocolate creation.
			</Text>

			<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
				{shapes.map(({ type, label, description, image, price }) => (
					<Box
						key={type}
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
								src={image}
								onError={(e) => {
									(
										e.target as HTMLImageElement
									).src = `https://via.placeholder.com/200x120?text=${label}`;
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
								{label}
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
