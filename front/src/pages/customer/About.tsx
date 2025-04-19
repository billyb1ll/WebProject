import React from "react";
import {
	Box,
	Container,
	Heading,
	Text,
	Image,
	SimpleGrid,
} from "@chakra-ui/react";
import AnimatedPage from "../../components/common/AnimatedPage";
import { motion } from "framer-motion";

export default function About() {
	return (
		<AnimatedPage>
			<Container maxW="container.xl" py={10}>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}>
					<Heading as="h1" size="xl" mb={6} color="#604538">
						About Us
					</Heading>
				</motion.div>

				<SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
					<Box>
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2, duration: 0.6 }}>
							<Text fontSize="lg" mb={4}>
								Ratamoth Chocolate was founded in 2023 with a simple mission: to create
								delicious, handcrafted chocolate using traditional techniques and the
								finest ingredients.
							</Text>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.4, duration: 0.6 }}>
							<Text fontSize="lg" mb={4}>
								Our master chocolatiers have decades of experience, perfecting the art
								of chocolate making. Each piece of chocolate is made with care,
								precision, and love.
							</Text>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.6, duration: 0.6 }}>
							<Text fontSize="lg">
								Located in Bangkok, Thailand, our shop has become a destination for
								chocolate lovers and those seeking special gifts for their loved ones.
							</Text>
						</motion.div>
					</Box>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.3, duration: 0.7 }}>
						<Box>
							<Image
								src="https://images.unsplash.com/photo-1549233632-80d9aad47e5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
								alt="Chocolate making process"
								borderRadius="md"
								boxShadow="lg"
							/>
						</Box>
					</motion.div>
				</SimpleGrid>
			</Container>
		</AnimatedPage>
	);
}
