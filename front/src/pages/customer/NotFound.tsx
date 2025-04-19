import React from "react";
import { Box, Container, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";


export default function NotFound() {
	return (
		<Container maxW="container.xl" py={20} textAlign="center">
			<Heading as="h1" size="2xl" mb={6} color="#604538">
				404
			</Heading>
			<Heading as="h2" size="xl" mb={6}>
				Page Not Found
			</Heading>
			<Text fontSize="lg" mb={8}>
				The page you're looking for doesn't exist or has been moved.
			</Text>
			<Button
				as={Link}
				to="/"
				colorScheme="brown"
				bg="#A47864"
				size="lg"
				_hover={{ bg: "#604538" }}>
				Back to Home
			</Button>
		</Container>
	);
}
