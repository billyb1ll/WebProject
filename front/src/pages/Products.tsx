import React, { useEffect, useState } from "react";
import {
	Box,
	Heading,
	Text,
	SimpleGrid,
	Slider,
	FormatNumber,
	Image,
	Flex,
	Accordion,
	Span,
	useBreakpointValue,
	Button,
	Portal,
	Menu,
	Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AnimatedPage from "../components/common/AnimatedPage";
import { motion } from "framer-motion";
import Banner from "../components/layout/banner";
import Breadcrumbs from "@/components/layout/Breadcrumb";
import { COLORS } from "@/constants/colors";
import { FaFilter } from "react-icons/fa";

import { productService, ProductFilters } from "@/services/api/productService";
import { ServerProduct } from "@/types/product.types";

import { HiSortAscending } from "react-icons/hi";

export default function Product() {
	const [loading, setLoading] = useState(true);
	const [showFilters, setShowFilters] = useState(false);
	const isMobile = useBreakpointValue({ base: true, md: false });
	const [products, setProducts] = useState<ServerProduct[]>([]);
	const [error, setError] = useState<string | null>(null);

	// Sort options with corresponding API parameters
	type SortOption = {
		id: string;
		label: string;
		sort: "price" | "name" | "newest";
		order: "asc" | "desc";
	};

	const sortOptions: SortOption[] = [
		{ id: "price-asc", label: "Price: Low to High", sort: "price", order: "asc" },
		{
			id: "price-desc",
			label: "Price: High to Low",
			sort: "price",
			order: "desc",
		},
		{ id: "name-asc", label: "Name: A to Z", sort: "name", order: "asc" },
		{ id: "name-desc", label: "Name: Z to A", sort: "name", order: "desc" },
		{ id: "newest-asc", label: "Newest First", sort: "newest", order: "asc" },
	];

	// Add default current sort option
	const [currentSortOption] = useState<SortOption>(sortOptions[0]);

	// Function to fetch products without sorting parameters
	const fetchProducts = async (filters?: ProductFilters) => {
		try {
			setLoading(true);
			const response = await productService.getProducts(filters);

			if (Array.isArray(response)) {
				setProducts(response);
			} else if (
				response &&
				typeof response === "object" &&
				"products" in response
			) {
				setProducts(response.products || []);
			} else {
				setProducts([]);
				setError("Failed to fetch products");
			}
		} catch (error) {
			console.error("Error fetching data:", error);
			setError("Error fetching data");
		} finally {
			setLoading(false);
		}
	};

	// Fetch products on component mount
	useEffect(() => {
		fetchProducts();
	}, []);

	const productMapping = React.useMemo(() => {
		return products.map((product) =>
			productService.mapServerProductToProduct(product)
		);
	}, [products]);

	// Mock data for categories
	const items = [
		{ value: "a", title: "Chocolate Type 1", text: "Some value 1..." },
		{ value: "b", title: "Chocolate Type 2", text: "Some value 2..." },
		{ value: "c", title: "Chocolate Type 3", text: "Some value 3..." },
	];

	return (
		<AnimatedPage>
			<Banner />
			<Breadcrumbs />
			<Flex direction="column" bg="transparent" width="auto">
				{/* Mobile filter and sort options */}
				<Flex justifyContent="flex-end" px={4} mt={4} width="100%">
					{isMobile && (
						<Button
							aria-label="Toggle filters"
							onClick={() => setShowFilters(!showFilters)}
							size="sm"
							colorScheme="brown"
							variant="outline"
							mr="auto">
							<FaFilter />
						</Button>
					)}

					{/* Sort dropdown - visible on all screen sizes and right-aligned */}
					<Menu.Root>
						<Menu.Trigger asChild>
							<Button
								backgroundColor={COLORS.BRAND_PRIMARY}
								color="white"
								width="auto"
								borderRadius="md"
								display="flex"
								colorScheme="brown"
								_hover={{ backgroundColor: COLORS.BRAND_DARK }}
								ml={isMobile ? "0" : "auto"}>
								<HiSortAscending />
								<Text ml="2">Sort: {currentSortOption.label}</Text>
							</Button>
						</Menu.Trigger>
						<Portal>
							<Menu.Positioner>
								<Menu.Content zIndex={10} minW="10rem">
									<Menu.RadioItemGroup value={currentSortOption.id}>
										{sortOptions.map((option) => (
											<Menu.RadioItem
												key={option.id}
												value={option.id}
												onSelect={() => {
													fetchProducts({
														sort: option.sort,
														order: option.order,
													});
												}}
												className="menu-item">
												<Text>{option.label}</Text>
												<Menu.ItemIndicator />
											</Menu.RadioItem>
										))}
									</Menu.RadioItemGroup>
								</Menu.Content>
							</Menu.Positioner>
						</Portal>
					</Menu.Root>
				</Flex>
				<Flex
					direction={{ base: "column", md: "row" }}
					justifyContent="center"
					gap={{ base: "4", md: "10" }}
					mt="10"
					px={{ base: "4", md: "10" }}>
					{/* Filter section */}
					<Box
						display={{
							base: isMobile ? (showFilters ? "flex" : "none") : "flex",
							md: "flex",
						}}
						bg="white"
						flexDirection="column"
						alignItems="center"
						boxShadow="sm"
						p={4}
						rounded="md"
						justifyContent="flex-start"
						borderRadius="md"
						w={{ base: "100%", md: "30%" }}
						mb={{ base: 6, md: 0 }}>
						<Slider.Root
							width="100%"
							aria-label={["Price range"]}
							maxWidth={{ base: "70%", md: "90%" }}
							defaultValue={[0, 100]}
							minStepsBetweenThumbs={8}
							size={"sm"}
							textAlign="left">
							<Slider.Label>
								<Text textStyle="xl" mb="5" color={COLORS.BRAND_PRIMARY}>
									FILTER BY PRICE{" "}
								</Text>
							</Slider.Label>
							<Slider.Control>
								<Slider.Track>
									<Slider.Range bg={COLORS.BRAND_DARK} />
								</Slider.Track>
								<Slider.Thumb index={0}>
									<Slider.DraggingIndicator
										layerStyle="fill.solid"
										top="6"
										rounded="sm"
										px="1.5"
									/>
								</Slider.Thumb>
								<Slider.Thumb index={1}>
									<Slider.DraggingIndicator
										layerStyle="fill.solid"
										top="6"
										rounded="sm"
										px="1.5"></Slider.DraggingIndicator>
								</Slider.Thumb>
								<Slider.Marks
									marks={[
										{
											value: 0,
											label: (
												<Text textStyle="1xl" color="#AB8371">
													$30
												</Text>
											),
										},
										{
											value: 100,
											label: (
												<Text textStyle="1xl" color="#AB8371">
													$3500
												</Text>
											),
										},
									]}
								/>
							</Slider.Control>
						</Slider.Root>

						<Accordion.Root
							multiple
							defaultValue={["b"]}
							width="100%"
							mt="10"
							color="black">
							<Text fontWeight="semibold" textStyle="2xl" mb="5" color="#422F27">
								CATEGORIES{" "}
							</Text>
							{items.map((item, index) => (
								<Accordion.Item key={index} value={item.value}>
									<Accordion.ItemTrigger bg="none">
										<Span flex="1">{item.title}</Span>
										<Accordion.ItemIndicator />
									</Accordion.ItemTrigger>
									<Accordion.ItemContent>
										<Accordion.ItemBody>{item.text}</Accordion.ItemBody>
									</Accordion.ItemContent>
								</Accordion.Item>
							))}
						</Accordion.Root>
					</Box>

					{/* Products grid */}
					<SimpleGrid
						columns={{ base: 1, sm: 2, lg: 3 }}
						gap={{ base: 4, md: 6, lg: 10 }}
						mb="10%"
						width={{ base: "100%", md: "70%" }}
						justifyContent="center">
						{loading ? (
							// Show loading state with spinner
							<Flex
								width="100%"
								justifyContent="center"
								alignItems="center"
								gridColumn="1 / -1"
								py={10}>
								<Spinner size="xl" color={COLORS.BRAND_PRIMARY} />
							</Flex>
						) : error ? (
							// Show error state
							<Text color="red.500" gridColumn="1 / -1" textAlign="center">
								{error}
							</Text>
						) : productMapping.length === 0 ? (
							// Show empty state
							<Text gridColumn="1 / -1" textAlign="center">
								No products found
							</Text>
						) : (
							// Show products from API
							productMapping.map((product) => (
								<motion.div key={product.id}>
									<Link to={`/products/${product.id}`}>
										{/* Product card */}
										<Box
											bg="white"
											color="#604538"
											borderRadius="md"
											boxShadow="md"
											height={{ base: "auto", md: "450px", lg: "500px" }}
											maxWidth="100%"
											border={"1px solid #E8DDD8"}
											mt={{ base: 2, md: 4 }}
											_hover={{
												transform: "scale(1.02)",
												boxShadow: "lg",
												transition: "all 0.4s ease",
											}}
											p={{ base: 3, md: 5 }}
											textAlign="center">
											<Image
												src={
													product.images?.find((img) => img.isPrimary)?.imageUrl ||
													(product.images && product.images.length > 0
														? product.images[0].imageUrl
														: "")
												}
												alt={product.name}
												objectFit="cover"
												borderRadius="md"
												bg="#E8E2D9"
												height={{ base: "180px", md: "200px", lg: "250px" }}
												width="100%"
												mb={4}
												backgroundSize="cover"
												backgroundPosition="center"
											/>
											<Heading as="h3" size={{ base: "md", md: "lg" }} color="#604538">
												{product.name}
											</Heading>
											<Text fontSize={{ base: "xs", md: "sm" }} color="#989898" mt={2}>
												{product.description}
											</Text>
											<Text textStyle="lg" mt={2} fontWeight="bold">
												<FormatNumber
													value={product.price}
													style="currency"
													currency="USD"
												/>
											</Text>
										</Box>
									</Link>
								</motion.div>
							))
						)}
					</SimpleGrid>
				</Flex>
			</Flex>
		</AnimatedPage>
	);
}
