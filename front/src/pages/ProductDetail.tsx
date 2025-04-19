import React, { useState } from "react";
import { COLORS } from "@/constants/colors";
import {
	Box,
	Container,
	Heading,
	Text,
	Button,
	Flex,
	Icon,
	SimpleGrid,
	Tabs,
	Image,
	Grid,
	For
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

const ProductDetailPage: React.FC = () => {
	const [quantity, setQuantity] = useState(1);

	const handleIncrease = () => setQuantity(quantity + 1);
	const handleDecrease = () => {
		if (quantity > 1) setQuantity(quantity - 1);
	};

	return (
		<Container maxW="container.xl" py={8} >
			{/* Product Section */}
			<Flex gap={8} mb={12}>
				{/* Left Side */}
				<Box flex="1" justifyContent={"center"} alignItems="center">

					<Flex mt={10} pt={"2.5"} gap={6}>
						{/* Left Column with Boxes */}
						<SimpleGrid gap={3}>
							<Box height="20" width="20" backgroundColor={COLORS.BRAND_LIGHT}> <Image src="/placeholder-product.jpg" alt="Product 1" /></Box>
							<Box height="20" width="20" backgroundColor={COLORS.BRAND_LIGHT}> <Image src="/placeholder-product.jpg" alt="Product 2" /></Box>
							<Box height="20" width="20" backgroundColor={COLORS.BRAND_LIGHT}> <Image src="/placeholder-product.jpg" alt="Product 2" /></Box>
							<Box height="20" width="20" backgroundColor={COLORS.BRAND_LIGHT}> <Image src="/placeholder-product.jpg" alt="Product 2" /></Box>
							<Box height="20" width="20" backgroundColor={COLORS.BRAND_LIGHT}> <Image src="/placeholder-product.jpg" alt="Product 2" /></Box>
						</SimpleGrid>

						{/* Right Large Box */}
						<Box height="100" width="65%" backgroundColor={COLORS.BRAND_LIGHT}> <Image src="/placeholder-product.jpg" alt="Product 2" /></Box>
					</Flex>
				</Box>

				{/* Right Side */}
				<Box flex="1.5">
					<Heading as="h1" size="lg" mb={4}>
						White Chocolate
					</Heading>
					<Text fontSize="2xl" fontWeight="bold" color="gray.700" mb={4}>
						$9999
					</Text>

					<Flex justify={"left"} gap={4} mb={4}>
						<Flex
							border="1px solid gray"
							borderRadius="md"
							align="center"
							justify="space-between"
							width="192px"
							height="50px"
							px={2}
							py={2}
						>
							<Flex align="center" gap={8}>
								<Button alignItems="center" size="sm" onClick={handleDecrease} color="black" >
									<Text textStyle="xl" fontWeight="bold" color="black">
										-
									</Text>
								</Button>
								<Text fontWeight="bold">{quantity}</Text>
								<Button size="sm" onClick={handleIncrease} color="black">
									<Text textStyle="xl" fontWeight="bold" color="black">
										+
									</Text>
								</Button>
							</Flex>
						</Flex>
						<Button justifyContent={""}
							backgroundColor="brown"
							color="white"
							fontWeight="bold"
							px={8}
							py={6}
							_hover={{ backgroundColor: "darkbrown" }}

						>
							Purchase
						</Button>
					</Flex>

					<SimpleGrid columns={3} gap={4} mb={4}>

						<Button backgroundColor="gray.200" _hover={{ backgroundColor: "gray.300" }}>
							Variant 1
						</Button>
						<Button backgroundColor="gray.200" _hover={{ backgroundColor: "gray.300" }}>
							Variant 2
						</Button>
						<Button backgroundColor="gray.200" _hover={{ backgroundColor: "gray.300" }}>
							Variant 3
						</Button>

					</SimpleGrid>

					<Text fontSize="md" color="gray.600" mb={4}>
						9000 items sold in last 3 hours
					</Text>

					<Flex align="center" gap={2} mb={4}>
						<Icon as={FaHeart} color="pink.500" />
						<Text fontSize="md" color="gray.600">
							Add to wishlist
						</Text>
					</Flex>

					<Box>
						<Text fontSize="sm" color="gray.500">
							<strong>SKU:</strong> 12345
						</Text>
						<Text fontSize="sm" color="gray.500">
							<strong>Category:</strong> Chocolates
						</Text>
						<Text fontSize="sm" color="gray.500">
							<strong>Tags:</strong> Sweet, Dessert
						</Text>
					</Box>
				</Box>
			</Flex>

			{/* Tabs Section */}

			<Tabs.Root gap={2} defaultValue="members" variant="outline" >
				<Tabs.List >
					<Tabs.Trigger value="members" gap={2} >
						Members
					</Tabs.Trigger>
					<Tabs.Trigger value="projects" >
						Projects
					</Tabs.Trigger>
					<Tabs.Trigger value="tasks" >
						Settings
					</Tabs.Trigger>
				</Tabs.List>

				<Tabs.Content textAlign={"left"} value="members">
					Manage your team members
				</Tabs.Content>
				<Tabs.Content value="projects">
					Manage your projects
				</Tabs.Content>
				<Tabs.Content value="tasks">
					Manage your tasks for freelancers
				</Tabs.Content>
			</Tabs.Root>

			{/* Recommended Section */}
			<Box bg="pink">
				<Heading as="h2" size="md" mb={4} mt={200}>
					Recommended
				</Heading>
				<Grid templateColumns="repeat(4, 1fr)" gap={6}>
					{Array.from({ length: 8 }).map((_, index) => (
						<Box
							key={index}
							border="1px solid gray"
							borderRadius="md"
							p={20}
							textAlign="center"
							boxShadow="sm"
						>
							<Image src="/placeholder-product.jpg" alt={`Product ${index + 1}`} mb={2} />
							<Text>Product {index + 1}</Text>
						</Box>
					))}
				</Grid>
			</Box>
		</Container>
	);
};

export default ProductDetailPage;