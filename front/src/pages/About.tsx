import React from "react";
import {
	Box,
	Container,
	Heading,
	Text,
	Image,
	SimpleGrid,
} from "@chakra-ui/react";

export default function About() {
	return (
		<>
			<Container maxW="container.xl" py={10}>
				<Heading as="h1" size="xl" mb={6} color="#604538">
					About Us
				</Heading>

				<SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
					<Box>
						<Text fontSize="lg" mb={4}>
							Ratamoth Chocolate was founded in 2023 with a simple mission: to create
							delicious, handcrafted chocolate using traditional techniques and the
							finest ingredients.
						</Text>
						<Text fontSize="lg" mb={4}>
							Our master chocolatiers have decades of experience, perfecting the art of
							chocolate making. Each piece of chocolate is made with care, precision,
							and love.
						</Text>
						<Text fontSize="lg">
							Located in Bangkok, Thailand, our shop has become a destination for
							chocolate lovers and those seeking special gifts for their loved ones.
						</Text>
					</Box>
					<Box>
						<Image
							src="https://images.unsplash.com/photo-1549233632-80d9aad47e5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
							alt="Chocolate making process"
							borderRadius="md"
							boxShadow="lg"
						/>
					</Box>
				</SimpleGrid>
			</Container>
		</>
	);
}
