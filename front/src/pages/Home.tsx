import React, { useEffect, useState } from "react";
import Banner from "../components/layout/banner";
import AnimatedPage from "../components/common/AnimatedPage";

import {
	Box,
	Container,
	Heading,
	Text,
	SimpleGrid,
	FormatNumber,
	Avatar,
	Image,
	Spinner,
	Center,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { productService } from "../services/api/productService";
import {
	ApiResponse,
	ServerProduct,
	MappedProduct,
	ServerProductImage,
} from "../types/product.types";

export default function Home() {
	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(true);
	const [featuredProducts, setFeaturedProducts] = useState<ServerProduct[]>([]);
	const [error, setError] = useState<string | null>(null);

	// Fetch products from API
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				// Get featured products from API for the homepage
				const featuredResponse = await productService.getFeaturedProducts();
				console.log("Featured API response:", featuredResponse);

				// Check response structure and extract products accordingly
				if (Array.isArray(featuredResponse)) {
					// Handle direct array response
					setFeaturedProducts(featuredResponse);
				} else if (
					featuredResponse &&
					typeof featuredResponse === "object" &&
					"success" in featuredResponse
				) {
					// Handle { success: true, data: [...] } format
					setFeaturedProducts(
						(featuredResponse as ApiResponse<ServerProduct[]>).data || []
					);
				} else {
					// Fallback
					setFeaturedProducts([]);
				}

				setError(null);
			} catch (err) {
				console.error("Failed to fetch featured products:", err);
				setError("Failed to load featured products. Please try again later.");

				// Fallback to regular product listing if featured products fail
				try {
					// Provide default filters to avoid "filters.page is undefined" error
					const response = await productService.getProducts({
						page: 1,
						limit: 6,
					});
					console.log("Fallback API response:", response);
					setFeaturedProducts(response.products || []);
					setError(null);
				} catch (fallbackErr) {
					console.error("Fallback request also failed:", fallbackErr);
					// Set empty array to prevent rendering issues
					setFeaturedProducts([]);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	const reviews = [
		{
			id: 1,
			text: "The best chocolate I've ever tasted!",
			author: "Emma Thompson",
		},
		{
			id: 2,
			text: "Absolutely divine chocolate treats.",
			author: "Michael Johnson",
		},
		{
			id: 3,
			text: "Perfect gift for any occasion.",
			author: "Sarah Parker",
		},
		{
			id: 4,
			text: "I'm addicted to these amazing chocolates.",
			author: "David Wilson",
		},
		{
			id: 5,
			text: "A delightful experience with every bite.",
			author: "Ratamoth islam",
		},
	];

	// Auto-scroll every 5 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [reviews.length]);

	// Format API products to match UI requirements
	const mappedProducts = React.useMemo(() => {
		if (!featuredProducts || featuredProducts.length === 0) {
			return [];
		}

		return featuredProducts.map((product) => {
			// Handle the new database field names that might be returned from the API
			const id = product.id || product.product_id;
			const name = product.name || product.product_name;
			const price =
				typeof product.price === "number"
					? product.price
					: typeof product.product_price === "number"
					? product.product_price
					: typeof product.product_price === "string"
					? parseFloat(product.product_price)
					: 0;
			const description =
				product.description || product.product_des || "No description available.";

			// Handle different image structures that might be returned
			let imageUrl = "https://via.placeholder.com/300?text=No+Image";

			if (product.images && product.images.length > 0) {
				const primaryImage = product.images.find(
					(img) => img.isPrimary || img.is_primary === true || img.is_primary === 1
				);

				if (primaryImage) {
					imageUrl = primaryImage.imageUrl || primaryImage.image_url || imageUrl;
				} else {
					// Use first image if no primary image is found
					const firstImage = product.images[0];
					imageUrl = firstImage.imageUrl || firstImage.image_url || imageUrl;
				}
			}

			return {
				id: typeof id === "number" ? id : 0, // Ensure id is a number
				name: name || "Unnamed Product",
				price: typeof price === "number" ? price : 0,
				image: imageUrl,
				description: description || "",
			} as MappedProduct;
		});
	}, [featuredProducts]);

	return (
		<AnimatedPage>
			{/* Hero banner component */}
			<Banner />
			{/* Main content container */}
			<Container
				maxW="container.xl"
				py={{ base: 6, md: 10 }}
				px={{ base: 4, md: 6 }}>
				{/* Welcome section */}
				<Box textAlign="center" mb={8} mt={4}>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.5 }}>
						<Heading
							as="h1"
							size={{ base: "xl", md: "2xl" }}
							mb={{ base: 4, md: 6 }}
							color="#604538"
							lineHeight="1.2">
							Welcome to Ratamoth Chocolate
						</Heading>
						<Text fontSize={{ base: "md", md: "lg" }} maxW="800px" mx="auto">
							Discover our premium selection of handcrafted chocolates made with the
							finest ingredients.
						</Text>
					</motion.div>
				</Box>

				{/* Weekly Best Sellers Section */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.4, duration: 0.5 }}>
					<Box textAlign="center" mb={8} mt={10} pt={"2.5"}>
						<Heading
							as="h2"
							size={{ base: "lg", md: "xl" }}
							mb={{ base: 4, md: 6 }}
							color="#604538"
							lineHeight="1.2">
							Weekly Best Sellers
						</Heading>
						<Text fontSize={{ base: "md", md: "lg" }} maxW="800px" mx="auto" mb={6}>
							Our most popular handcrafted chocolates this week.
						</Text>
					</Box>
				</motion.div>

				{/* Product Grid */}
				{loading ? (
					<Center py={10}>
						<Spinner size="xl" color="#604538" />
					</Center>
				) : error ? (
					<Center py={10}>
						<Text color="red.500">{error}</Text>
					</Center>
				) : mappedProducts.length === 0 ? (
					<Center py={10}>
						<Text color="#604538">No featured products available at this time.</Text>
					</Center>
				) : (
					<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={{ base: 6, md: 10 }}>
						{mappedProducts.slice(0, 6).map((product, idx) => (
							<motion.div
								key={product.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}>
								<Link to={`/products/${product.id}`}>
									{/* Product card */}
									<Box
										bg="white"
										color="#604538"
										borderRadius="md"
										boxShadow="md"
										_hover={{
											transform: "scale(1.02)",
											boxShadow: "lg",
											transition: "all 0.4s ease",
										}}
										p={6}
										textAlign="center">
										<Heading as="h3" size="lg" mb={4} color="#604538">
											{product.name}
										</Heading>
										<Image
											src={product.image}
											alt={product.name}
											objectFit="cover"
											borderRadius="md"
											bg="#E8E2D9"
											height="200px"
											width="100%"
											mb={4}
											backgroundSize="cover"
											backgroundPosition="center"
										/>
										<Text fontSize="md" color="#989898" mb={2}>
											{product.description}
										</Text>
										<Text textStyle="lg">
											<FormatNumber
												value={product.price}
												style="currency"
												currency="USD"
											/>
										</Text>
									</Box>
								</Link>
							</motion.div>
						))}
					</SimpleGrid>
				)}

				{/* Featured Images Section */}
				<Box
					display="flex"
					flexDirection={{ base: "column", md: "row" }}
					gap={{ base: 4, md: 10 }}
					mb={10}
					mt={16}>
					{/* Large featured image */}
					<Box
						flex="1"
						borderRadius="md"
						overflow="hidden"
						bg="gray.100"
						height={{ base: "200px", md: "auto" }}>
						{/* Large square image */}
						<Box bg="#E8E2D9" height="100%" width="100%">
							<Image
								src="/images/chocolate-making.jpg" // Update
								alt="Chocolate making process"
								objectFit="cover"
								height="100%"
								width="100%"
								borderRadius="md"
								transition="transform 0.5s ease"
								_hover={{ transform: "scale(1.03)" }}
							/>
						</Box>
					</Box>
					{/* Secondary featured images */}
					<Box
						flex="1"
						display="flex"
						flexDirection="column"
						gap={{ base: 4, md: 10 }}
						height={{ base: "auto", md: "720px" }}>
						{/* Top secondary image */}
						<Box
							bg="#F0EAE3"
							height={{ base: "120px", md: "49%" }}
							borderRadius="md"
							overflow="hidden">
							<Image
								src="/images/chocolate-selection.jpg" // Update
								alt="Chocolate selection"
								objectFit="cover"
								height="100%"
								width="100%"
								borderRadius="md"
								transition="transform 0.5s ease"
								_hover={{ transform: "scale(1.03)" }}
							/>
						</Box>
						{/* Bottom secondary image */}
						<Box
							bg="#E0D9CF"
							height={{ base: "120px", md: "49%" }}
							borderRadius="md"
							overflow="hidden">
							<Image
								src="/images/chocolate-making.jpg" // Update
								alt="Chocolate making process"
								objectFit="cover"
								height="100%"
								width="100%"
								borderRadius="md"
								transition="transform 0.5s ease"
								_hover={{ transform: "scale(1.03)" }}
							/>
						</Box>
					</Box>
				</Box>

				{/* Product Selection Section */}
				<Box my={16} textAlign="center" px={{ base: 4, md: 0 }}>
					<Heading
						as="h2"
						size={{ base: "md", md: "xl" }}
						mb={6}
						color="#604538"
						fontWeight="bold"
						letterSpacing="wide">
						OUR SELECTION
					</Heading>

					{/* Product cards grid */}
					{loading ? (
						<Center py={10}>
							<Spinner size="xl" color="#604538" />
						</Center>
					) : error ? (
						<Center py={10}>
							<Text color="red.500">{error}</Text>
						</Center>
					) : (
						<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={{ base: 4, md: 8 }}>
							{mappedProducts.slice(0, 3).map((product) => (
								<Link to={`/products/${product.id}`} key={product.id}>
									<Box
										bg="#F5F0E8"
										borderRadius="lg"
										overflow="hidden"
										border="1px solid #A38C7F"
										boxShadow="0 4px 12px rgba(0,0,0,0.05)"
										transition="transform 0.3s ease"
										_hover={{ transform: "translateY(-5px)" }}>
										{/* Product image */}
										<Box
											bg="#E8E2D9"
											height={{ base: "240px", md: "480px" }}
											width="100%">
											<Image
												src={product.image}
												alt={product.name}
												objectFit="cover"
												height="100%"
												width="100%"
												borderRadius="lg"
												transition="transform 0.5s ease"
											/>
										</Box>

										{/* Product footer with price and cart button */}
										<Box
											p={4}
											display="flex"
											flexDirection={{ base: "column", md: "row" }}
											justifyContent="space-between"
											alignItems="center"
											borderTop="1px solid #EFEFEF">
											<Box
												as="button"
												bg="transparent"
												color="#604538"
												px={4}
												py={2}
												border="1px solid #604538"
												borderRadius="md"
												fontSize="sm"
												fontWeight="medium"
												transition="all 0.2s"
												_hover={{ bg: "#604538", color: "white" }}>
												ADD TO CART
											</Box>
											<Text
												fontWeight="500"
												color="#604538"
												fontSize="md"
												mt={{ base: 2, md: 0 }}>
												<FormatNumber
													value={product.price}
													style="currency"
													currency="USD"
												/>
											</Text>
										</Box>
									</Box>
								</Link>
							))}
						</SimpleGrid>
					)}
				</Box>

				{/* Video Showcase Section */}
				<Box
					position="relative"
					my={{ base: 10, md: 20 }}
					bg="white"
					p={{ base: 4, md: 8 }}
					borderRadius="md"
					display="flex"
					justifyContent="space-between"
					flexDirection={{ base: "column", md: "row" }}
					gap={{ base: 4, md: 5 }}>
					{/* Video thumbnail - left */}
					<Box
						flex={{ base: "1", md: "0.3" }}
						bg="gray.200"
						height={{ base: "300px", md: "460px" }}
						width={{ base: "100%", md: "100%" }}
						alignSelf="flex-end"
						borderRadius="md"
						overflow="hidden">
						<Image
							src="/images/chocolate-making.jpg" // Update
							alt="Chocolate making process"
							objectFit="cover"
							height="100%"
							width="100%"
							transition="transform 0.5s ease"
							_hover={{ transform: "scale(1.03)" }}
						/>
					</Box>

					{/* Video thumbnail - right */}
					<Box
						flex={{ base: "1", md: "0.65" }}
						bg="gray.200"
						height={{ base: "200px", md: "400px" }}
						width={{ base: "100%", md: "100%" }}
						mt={{ base: 0, md: "60px" }}
						alignSelf="flex-end"
						mb={{ base: 4, md: 60 }}
						mr={{ base: 0, md: 10 }}
						display="flex"
						justifyContent="center"
						alignItems="center"
						borderRadius="md">
						<Image
							src="/images/chocolate-selection.jpg" // Update
							alt="Premium chocolate selection"
							objectFit="cover"
							height="100%"
							width="100%"
							transition="transform 0.5s ease"
						/>
					</Box>
				</Box>

				{/* Ingredients Section */}
				<Box textAlign="center" mb={16}>
					<Heading
						as="h2"
						fontSize={{ base: "xl", md: "2xl" }}
						fontWeight="bold"
						color="black"
						mb={8}>
						FINEST INGREDIENTS
					</Heading>

					{/* Ingredient circles */}
					<Box
						display="flex"
						justifyContent="space-around"
						alignItems="center"
						gap={6}>
						{[1, 2, 3, 4].map((_, index) => (
							<Box
								key={index}
								bg="gray.200"
								width={{ base: "60px", md: "200px" }}
								height={{ base: "60px", md: "200px" }}
								borderRadius="50%"
								display="flex"
								justifyContent="center"
								alignItems="center">
								<Image
									src={`/images/ingredient-${index + 1}.jpg`} // Update
									alt={`Ingredient ${index + 1}`}
									borderRadius="full"
									border="none"
									boxSize={{ base: "40px", md: "80px" }}
									objectFit="cover"
									transition="transform 0.5s ease"
								/>
							</Box>
						))}
					</Box>
				</Box>

				{/* Premium Chocolate Selection Section */}
				<Box
					display="flex"
					flexDirection={{ base: "column", md: "row" }}
					height={{ base: "auto", md: "900px" }}
					alignItems="stretch"
					justifyContent="space-between"
					my={{ base: 10, md: 16 }}
					px={{ base: 4, md: 9 }}
					py={{ base: 6, md: 10 }}
					bg="white"
					borderRadius="md"
					position="relative"
					overflow="hidden"
					gap={{ base: 6, md: 10 }}>
					{/* Product information card */}
					<Box
						flex={{ base: "1", md: "0.65" }}
						bg="#FCE2C2"
						mt={{ base: 0, md: 20 }}
						p={5}
						height={{ base: "200px", md: "520px" }}
						maxWidth={{ base: "100%", md: "55%" }}
						borderRadius="md"
						display="flex"
						textAlign="left"
						flexDirection="column"
						justifyContent="flex-start"
						position="relative"
						overflow="visible"
						zIndex={1}>
						<Heading
							fontSize={{ base: "lg", md: "xl" }}
							fontWeight="bold"
							color="black"
							mb={4}>
							Premium Chocolate Selection
						</Heading>
						<Text
							fontSize={{ base: "sm", md: "md" }}
							fontWeight="light"
							color="black">
							Indulge in our finest collection of handcrafted chocolates.
						</Text>

						{/* Decorative background element */}
						<Box
							position="absolute"
							bottom={{ base: "-30px", md: "-150px" }}
							right={{ base: "-20px", md: "-200px" }}
							width={{ base: "100px", md: "250px" }}
							height={{ base: "100px", md: "350px" }}
							bg="#604538"
							borderRadius="md"
							zIndex={0}
						/>
					</Box>

					{/* Product feature image */}
					<Box
						flex={{ base: "1", md: "0.4" }}
						borderRadius="md"
						overflow="hidden"
						height={{ base: "240px", md: "520px" }}
						maxWidth={{ base: "100%", md: "28%" }}>
						<Box
							bg="#E8E2D9"
							height="100%"
							width="100%"
							backgroundImage="url('/images/chocolate-selection.jpg')"
							backgroundSize="cover"
							backgroundPosition="center"
							transition="transform 0.3s ease-in-out"
							_hover={{ transform: "scale(1.05)" }}
						/>
					</Box>
				</Box>

				{/* Customer Reviews Section */}
				<Box textAlign="center" py={10} position="relative">
					{/* Animated review content */}
					<motion.div
						key={index}
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -50 }}
						transition={{ duration: 0.5 }}>
						<Text fontSize="3xl" fontWeight="bold">
							“ {reviews[index].text} ”
						</Text>
					</motion.div>

					{/* Customer avatar and details */}
					<Box mt={4}>
						<Avatar.Root>
							<Avatar.Fallback
								name={reviews[index].author}
								transition="transform 0.3s ease-in-out"
							/>
							<Avatar.Image
								src={`https://api.adorable.io/avatars/285/${reviews[index].author}.png`}
								alt={reviews[index].author}
								transition="transform 0.3s ease-in-out"
							/>
						</Avatar.Root>
						<Text fontSize="lg" fontWeight="bold" color="#604538">
							{reviews[index].author}
						</Text>
						<Text fontSize="sm" color="#989898">
							{reviews[index].id} of {reviews.length}
						</Text>
					</Box>
				</Box>
			</Container>
		</AnimatedPage>
	);
}
