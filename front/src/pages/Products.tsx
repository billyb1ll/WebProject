import React from "react";
import { Box, Container, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AnimatedPage from "../components/common/AnimatedPage";
import { motion } from "framer-motion";

export default function Product() {
	// Animation variants for the product cards
	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.2,
				duration: 0.5,
				ease: "easeOut",
			},
		}),
	};

	return (
		<AnimatedPage>
			<Container maxW="container.xl" py={10}>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}>
					<Heading as="h1" size="xl" mb={6} color="#604538">
						Our Features
					</Heading>
					<Text fontSize="lg" mb={8}>
						Explore what makes our chocolate products special.
					</Text>
				</motion.div>

				<SimpleGrid columns={{ base: 1, md: 3 }} gap={10} mt={10}>
					<motion.div
						custom={0}
						initial="hidden"
						animate="visible"
						variants={cardVariants}>
						<Link to="/custom">
							<Box
								p={5}
								shadow="md"
								borderWidth="1px"
								borderRadius="md"
								_hover={{
									transform: "scale(1.05)",
									boxShadow: "lg",
									transition: "all 0.3s ease",
								}}>
								<Heading fontSize="xl" color="#A47864">
									Custom Chocolate Designs
								</Heading>
								<Text mt={4} color="black">
									Create your own personalized chocolate with custom shapes and flavors.
								</Text>
							</Box>
						</Link>
					</motion.div>

					<motion.div
						custom={1}
						initial="hidden"
						animate="visible"
						variants={cardVariants}>
						<Box
							p={5}
							shadow="md"
							borderWidth="1px"
							borderRadius="md"
							_hover={{
								transform: "scale(1.05)",
								boxShadow: "lg",
								transition: "all 0.3s ease",
							}}>
							<Heading fontSize="xl" color="#A47864">
								Premium Ingredients
							</Heading>
							<Text mt={4}>
								We use only the finest cacao beans and natural ingredients.
							</Text>
						</Box>
					</motion.div>

					<motion.div
						custom={2}
						initial="hidden"
						animate="visible"
						variants={cardVariants}>
						<Box
							p={5}
							shadow="md"
							borderWidth="1px"
							borderRadius="md"
							_hover={{
								transform: "scale(1.05)",
								boxShadow: "lg",
								transition: "all 0.3s ease",
							}}>
							<Heading fontSize="xl" color="#A47864">
								Gift Packaging
							</Heading>
							<Text mt={4}>
								Beautiful packaging options for special occasions and gifts.
							</Text>
						</Box>
					</motion.div>
				</SimpleGrid>
			</Container>
		</AnimatedPage>
	);
}
