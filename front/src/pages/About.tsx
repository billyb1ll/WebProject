import React from "react";
import {
	Box,
	Container,
	Heading,
	Text,
	Image,
	SimpleGrid,
} from "@chakra-ui/react";
import AnimatedPage from "../components/common/AnimatedPage";
import { motion } from "framer-motion";

export default function About() {
	return (
		<>
		<AnimatedPage>
			<Container maxW="container.xl" py={10}>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}>
					<Heading as="h1" size="xl" mb={6} color="#604538">
					<Box 
     					width="100%" 
      					height="100px" 
      					bg="#C29C8A" 
      					position=  "relative" 
      					display="flex" 
      					justifyContent="center" 
      					alignItems="center"
      					color="white" 
      					fontSize="32px"
      					fontFamily="Arial, sans-serif"
    				>
	  <Text zIndex="1">About us</Text>
					</Box>
					</Heading>

				</motion.div>

				<SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
					<Box>
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
					</Box>
					<Box><motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2, duration: 0.6 }}>
								<Heading as="h2" size="lg" mb={4} color="#604538">
								WHY CHOOSE US
								</Heading>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.4, duration: 0.6 }}>
							<Text fontSize="lg" mb={4}>
								Why we are the best
							</Text>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.6, duration: 0.6 }}>
							<Text fontSize="lg">
							ChocoMoth produces the finest chocolates that our customers love, 
							using only the highest quality ingredients. We hand-craft our chocolates to suit our customers' needs
							</Text>
						</motion.div>
						<SimpleGrid columns={{ base: 1, md: 2 }} gap={10} mt={10}>
						<Box>
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.3, duration: 0.7 }}>
								<Box
								width="100%" 
								height="70px" 
								bg="#C29C8A" 
								position=  "relative" 
								display="flex" 
								justifyContent="center" 
								alignItems="center"
								color="white" 
								fontSize="32px"
								fontFamily="Arial, sans-serif">
								<motion.div
										initial={{ opacity: 0, x: -30 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.2, duration: 0.6 }}>
										<Text fontSize="lg" mb={4}>
											online order
										</Text>
									</motion.div>
								</Box>
							</motion.div>
							<SimpleGrid columns={{ base: 1, md: 2 }} gap={10} mt={10}>
							<Box>
								<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.3, duration: 0.7 }}>
								<Box
								width="230%" 
      							height="70px" 
      							bg="#C29C8A" 
      							position=  "relative" 
      							display="flex" 
      							justifyContent="center" 
      							alignItems="center"
      							color="white" 
      							fontSize="32px"
      							fontFamily="Arial, sans-serif">
									<motion.div
										initial={{ opacity: 0, x: -30 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.2, duration: 0.6 }}>
										<Text fontSize="lg" mb={4}>
											Custom design
										</Text>
									</motion.div>
								</Box>
								</motion.div>
							</Box>
							
							</SimpleGrid>
						</Box>
						<Box>
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.3, duration: 0.7 }}>
								<Box
								width="100%" 
								height="70px" 
								bg="#C29C8A" 
								position=  "relative" 
								display="flex" 
								justifyContent="center" 
								alignItems="center"
								color="white" 
								fontSize="32px"
								fontFamily="Arial, sans-serif">
									<motion.div
										initial={{ opacity: 0, x: -30 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.2, duration: 0.6 }}>
										<Text fontSize="lg" mb={4}>
											Pick up
										</Text>
									</motion.div>
								</Box>
							</motion.div>
							<SimpleGrid columns={{ base: 1, md: 2 }} gap={10} mt={10}>
								<Box>
								<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.3, duration: 0.7 }}>
								<Box
								width="230%" 
								height="70px" 
								bg="#C29C8A" 
								position=  "relative" 
								display="flex" 
								justifyContent="center" 
								alignItems="center"
								color="white" 
								fontSize="32px"
								fontFamily="Arial, sans-serif"
								>
									<motion.div
										initial={{ opacity: 0, x: -30 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.2, duration: 0.6 }}>
										<Text fontSize="lg" mb={4}>
											Delivery
										</Text>
									</motion.div>
									</Box>
								</motion.div>
								</Box>
								</SimpleGrid>
							</Box>
						</SimpleGrid>
						</Box>
						
				</SimpleGrid>
			</Container>
		</AnimatedPage >
		</>
	);
}
