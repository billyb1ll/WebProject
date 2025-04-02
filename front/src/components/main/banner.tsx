import React, { useState, useEffect } from "react";
import { Box, Flex, Image, HStack } from "@chakra-ui/react";

// Sample banner images - replace images
const BANNER_IMAGES = [
	"https://images.unsplash.com/photo-1481391319762-47dff72954d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
	"https://images.unsplash.com/photo-1599599810769-bcde5a160d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
	"https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
];

export default function Banner() {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// Auto-scroll functionality
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prevIndex) =>
				prevIndex === BANNER_IMAGES.length - 1 ? 0 : prevIndex + 1
			);
		}, 5000); // Change image every 5 seconds

		return () => clearInterval(interval);
	}, []);

	return (
		<Box w="100%" position="relative" overflow="hidden">
			{/* Banner container with aspect ratio matching 1440x555 (2.6:1) */}
			<Box
				position="relative"
				width="100%"
				paddingBottom="38.54%"
				overflow="hidden">
				{/* Images with transition effect */}
				{BANNER_IMAGES.map((image, index) => (
					<Box
						key={index}
						position="absolute"
						top="0"
						left="0"
						width="100%"
						height="100%"
						opacity={index === currentImageIndex ? 1 : 0}
						transition="opacity 1s ease-in-out"
						zIndex={index === currentImageIndex ? 1 : 0}>
						<Image
							src={image}
							alt={`Banner image ${index + 1}`}
							objectFit="cover"
							objectPosition="center"
							width="100%"
							height="100%"
						/>
					</Box>
				))}

				{/* Navigation dots */}
				<Flex
					position="absolute"
					bottom="20px"
					left="0"
					right="0"
					width="100%"
					justifyContent="center"
					zIndex={10}>
					<HStack gap={2}>
						{BANNER_IMAGES.map((_, index) => (
							<Box
								key={index}
								h="12px"
								w="12px"
								borderRadius="50%"
								bg={index === currentImageIndex ? "white" : "whiteAlpha.700"}
								cursor="pointer"
								onClick={() => setCurrentImageIndex(index)}
								_hover={{ bg: "white" }}
								transition="background 0.3s"
								boxShadow="0 0 5px rgba(0,0,0,0.3)"
							/>
						))}
					</HStack>
				</Flex>
			</Box>
		</Box>
	);
}
