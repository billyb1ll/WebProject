import React from "react";
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AnimatedPage from "../components/common/AnimatedPage";
import { motion } from "framer-motion";
import Banner from "../components/layout/banner";
import Breadcrumbs from "@/components/layout/Breadcrumb";
import { COLORS } from "@/constants/colors";

export default function Product() {
	interface Product {
		id: number;
		name: string;
		price: number;
		image: string;
		description: string;
	}

	interface WeeklyBestSellers {
		products: Product[];
	}
	// Mock data for weekly best sellers
	// In a real application, this data would be fetched from an API or database
	const weeklyBestSellers: WeeklyBestSellers = {
		products: [
			{
				id: 1,
				name: "Chocolate Bar",
				price: 5.99,
				image: "path/to/image1.jpg",
				description: "Delicious chocolate bar with nuts.",
			},
			{
				id: 2,
				name: "Dark Chocolate",
				price: 7.99,
				image: "path/to/image2.jpg",
				description: "Rich dark chocolate with a hint of sea salt.",
			},
			{
				id: 3,
				name: "Milk Chocolate",
				price: 6.99,
				image: "path/to/image3.jpg",
				description: "Creamy milk chocolate with caramel filling.",
			},
			{
				id: 4,
				name: "Truffle Collection",
				price: 12.99,
				image: "path/to/image4.jpg",
				description: "Assorted chocolate truffles with various fillings.",
			},
			{
				id: 5,
				name: "White Chocolate",
				price: 6.49,
				image: "path/to/image5.jpg",
				description: "Smooth white chocolate with vanilla beans.",
			},
			{
				id: 6,
				name: "Chocolate Pralines",
				price: 9.99,
				image: "path/to/image6.jpg",
				description: "Premium pralines with hazelnut filling.",
			},
		],
	};
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
			<Flex gap="10" mt="10">
				<Box justifySelf="left" ml="10" width="30%">
					{/* Filter section */}
					<Slider.Root
						width="300px"
						defaultValue={[30, 60]}
						size={"lg"}
						textAlign="left"
						ml={10}>
						<Slider.Label>
							<Text textStyle="2xl" mb="5" color={COLORS.BRAND_PRIMARY}>
								FILTER BY PRICE{" "}
							</Text>
						</Slider.Label>
						<Slider.Control>
							<Slider.Track>
								<Slider.Range bg="#AB8371" />
							</Slider.Track>
							<Slider.Thumbs bg="#AB8371" borderColor="#AB8371">
								<Slider.DraggingIndicator>
									<Slider.ValueText />
								</Slider.DraggingIndicator>
							</Slider.Thumbs>

							<Slider.Marks
								marks={[
									{
										value: -10,
										label: (
											<Text textStyle="1xl" color="#AB8371">
												$30
											</Text>
										),
									},
									{
										value: 110,
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
						width="70%"
						mt="20"
						ml="10"
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
				<SimpleGrid
					columns={{ base: 1, sm: 2, md: 3 }}
					gap={{ base: 6, md: 10 }}
					mb="10%"
					width="60%">
					{weeklyBestSellers.products.map((product, idx) => (
						<motion.div>
							<Link to={`/products/${product.id}`}>
								{/* Product card */}
								<Box
									bg="white"
									color="#604538"
									borderRadius="md"
									boxShadow="md"
									height="500px"
									width="300px"
									border={"1px solid #E8DDD8"}
									mt="10"
									_hover={{
										transform: "scale(1.02)",
										boxShadow: "lg",
										transition: "all 0.4s ease",
									}}
									p={6}
									textAlign="center">
									<Image
										src={product.image}
										alt={product.name}
										objectFit="cover"
										borderRadius="md"
										bg="#E8E2D9"
										height="70%"
										width="100%"
										mb={4}
										backgroundSize="cover"
										backgroundPosition="center"
									/>
									<Heading as="h3" size="lg" color="#604538">
										{product.name}
									</Heading>
									<Text fontSize="sm" color="#989898">
										{product.description}
									</Text>
									<Text textStyle="lg">
										<FormatNumber value={product.price} style="currency" currency="USD" />
									</Text>
								</Box>
							</Link>
						</motion.div>
					))}
				</SimpleGrid>
			</Flex>
		</AnimatedPage>
	);
}
