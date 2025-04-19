import React from "react";
import {
	Box,
	Container,
	Heading,
	Text,
	SimpleGrid,
	Button,
} from "@chakra-ui/react";


export default function Pricing() {
	return (
		<Container maxW="container.xl" py={10}>
			<Heading as="h1" size="xl" mb={6} color="#604538">
				Pricing
			</Heading>
			<Text fontSize="lg" mb={8}>
				Choose the chocolate package that's right for you.
			</Text>

			<SimpleGrid columns={{ base: 1, md: 3 }} gap={10}>
				<Box p={6} boxShadow="lg" borderRadius="lg" bg="white">
					<Heading as="h3" size="lg" textAlign="center" color="#A47864">
						Standard
					</Heading>
					<Text fontSize="3xl" fontWeight="bold" textAlign="center" mt={4}>
						$19.99
					</Text>
					<Text color="gray.500" textAlign="center" mb={6}>
						per box
					</Text>
					<Button
						colorScheme="brown"
						bg="#A47864"
						width="full"
						_hover={{ bg: "#604538" }}>
						Order Now
					</Button>
				</Box>

				<Box p={6} boxShadow="lg" borderRadius="lg" bg="white">
					<Heading as="h3" size="lg" textAlign="center" color="#A47864">
						Premium
					</Heading>
					<Text fontSize="3xl" fontWeight="bold" textAlign="center" mt={4}>
						$34.99
					</Text>
					<Text color="gray.500" textAlign="center" mb={6}>
						per box
					</Text>
					<Button
						colorScheme="brown"
						bg="#A47864"
						width="full"
						_hover={{ bg: "#604538" }}>
						Order Now
					</Button>
				</Box>

				<Box p={6} boxShadow="lg" borderRadius="lg" bg="white">
					<Heading as="h3" size="lg" textAlign="center" color="#A47864">
						Custom
					</Heading>
					<Text fontSize="3xl" fontWeight="bold" textAlign="center" mt={4}>
						$49.99+
					</Text>
					<Text color="gray.500" textAlign="center" mb={6}>
						per design
					</Text>
					<Button
						colorScheme="brown"
						bg="#A47864"
						width="full"
						_hover={{ bg: "#604538" }}>
						Design Now
					</Button>
				</Box>
			</SimpleGrid>
		</Container>
	);
}
