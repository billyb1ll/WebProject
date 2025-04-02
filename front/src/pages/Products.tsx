import React from "react";
import { Box, Container, Heading, Text, SimpleGrid } from "@chakra-ui/react";

export default function Product() {
	return (
		<Container maxW="container.xl" py={10}>
			<Heading as="h1" size="xl" mb={6} color="#604538">
				Our Features
			</Heading>
			<Text fontSize="lg" mb={8}>
				Explore what makes our chocolate products special.
			</Text>

			<SimpleGrid columns={{ base: 1, md: 3 }} gap={10} mt={10}>
				<Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
					<Heading fontSize="xl" color="#A47864">
						Custom Chocolate Designs
					</Heading>
					<Text mt={4}>
						Create your own personalized chocolate with custom shapes and flavors.
					</Text>
				</Box>
				<Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
					<Heading fontSize="xl" color="#A47864">
						Premium Ingredients
					</Heading>
					<Text mt={4}>
						We use only the finest cacao beans and natural ingredients.
					</Text>
				</Box>
				<Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
					<Heading fontSize="xl" color="#A47864">
						Gift Packaging
					</Heading>
					<Text mt={4}>
						Beautiful packaging options for special occasions and gifts.
					</Text>
				</Box>
			</SimpleGrid>
		</Container>
	);
}
