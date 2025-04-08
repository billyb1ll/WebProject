import React from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import AnimatedPage from "../components/common/AnimatedPage";

const ProductDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();

	return (
		<AnimatedPage>
			<Container maxW="container.lg" py={8}>
				<Box textAlign="center" py={10}>
					<Heading as="h1" size="xl" mb={4}>
						รายละเอียดสินค้า
					</Heading>
					<Text fontSize="2xl" fontWeight="bold">
						รหัสสินค้า: {id}
					</Text>
					<Text mt={4} color="gray.600">
						คุณสามารถพัฒนาหน้านี้ต่อได้ตามต้องการ
					</Text>
				</Box>
			</Container>
		</AnimatedPage>
	);
};

export default ProductDetail;
