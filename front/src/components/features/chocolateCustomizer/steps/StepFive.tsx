import React from "react";
import {
	Box,
	Text,
	VStack,
	Textarea,
	SimpleGrid,
	Heading,
	Badge,
	Image,
	Flex,
} from "@chakra-ui/react";
import { ChocolateConfig } from "../../../../hooks/useChocolateConfigurator";
import { formatPrice } from "../../../../utils/priceCalculator";

interface StepFiveProps {
	config: ChocolateConfig;
	updateMessage: (message: string) => void;
}

const MESSAGE_PRICE = 1.99;

export default function StepFive({ config, updateMessage }: StepFiveProps) {
	const [messageOption, setMessageOption] = React.useState(
		config.message ? "custom" : "none"
	);

	const messageOptions = [
		{
			type: "none",
			label: "No Message",
			description: "Skip adding a personal message to your chocolate gift.",
			image: "/images/message-none.jpg",
			price: 0,
		},
		{
			type: "custom",
			label: "Custom Message",
			description: "Add a personalized message to make your gift special.",
			image: "/images/message-custom.jpg",
			price: MESSAGE_PRICE,
		},
	];

	const handleMessageOptionChange = (value: string) => {
		setMessageOption(value);
		if (value === "none") {
			updateMessage("");
		}
	};

	const handleCustomMessageChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		updateMessage(e.target.value);
	};

	return (
		<VStack gap={6} align="stretch">
			<Text color="#604538">
				Add a personal message to make your gift even more special.
			</Text>

			<SimpleGrid columns={{ base: 1, md: 3 }} gap={3}>
				{messageOptions.map(({ type, label, description, image, price }) => (
					<Box
						key={type}
						onClick={() => handleMessageOptionChange(type)}
						borderWidth="2px"
						borderRadius="lg"
						borderColor={messageOption === type ? "#A47864" : "transparent"}
						overflow="hidden"
						boxShadow="md"
						cursor="pointer"
						transition="all 0.3s ease"
						_hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
						bg={messageOption === type ? "#F5F0E8" : "white"}>
						<Box position="relative">
							<Image
								src={image}
								onError={(e) => {
									(
										e.target as HTMLImageElement
									).src = `https://via.placeholder.com/300x120?text=${label}`;
								}}
								alt={label}
								width="100%"
								height="120px"
								objectFit="cover"
							/>
							{/* Add price badge in top-left corner */}
							<Badge
								position="absolute"
								top={2}
								left={2}
								bg={price === 0 ? "green.500" : "orange.500"}
								color="white"
								px={2}
								py={1}
								borderRadius="md">
								{price === 0 ? "Free" : `+${formatPrice(price)}`}
							</Badge>
							{messageOption === type && (
								<Badge
									position="absolute"
									top={2}
									right={2}
									bg="#A47864"
									color="white"
									px={2}
									py={1}
									borderRadius="md">
									Selected
								</Badge>
							)}
						</Box>
						<Box p={3}>
							<Heading
								as="h3"
								size="sm"
								mb={1}
								color="#604538"
								fontSize="md"
								display="flex"
								justifyContent="space-between">
								{label}
								<Text
									as="span"
									fontSize="xs"
									fontWeight="medium"
									color={messageOption === type ? "#604538" : "gray.500"}>
									{price === 0 ? "Free" : `+${formatPrice(price)}`}
								</Text>
							</Heading>
							<Text fontSize="xs" color="gray.600">
								{description}
							</Text>
						</Box>
					</Box>
				))}

				{/* Empty placeholder box to maintain grid layout when only 2 options */}
				<Box display={{ base: "none", md: "block" }} />
			</SimpleGrid>

			{messageOption === "custom" && (
				<Box
					mt={4}
					p={4}
					borderRadius="lg"
					borderWidth="1px"
					borderColor="#E8DDD8"
					bg="white">
					<Flex justify="space-between" align="center" mb={2}>
						<Text fontWeight="medium" color="#604538">
							Your Personal Message
						</Text>
						<Badge colorScheme="orange">+{formatPrice(MESSAGE_PRICE)}</Badge>
					</Flex>
					<Textarea
						value={config.message}
						onChange={handleCustomMessageChange}
						placeholder="Write your message here (max 100 characters)"
						maxLength={100}
						rows={3}
						borderColor="#E8DDD8"
						_hover={{ borderColor: "#A47864" }}
						_focus={{ borderColor: "#604538", boxShadow: "0 0 0 1px #604538" }}
					/>
					<Text fontSize="xs" color="gray.500" mt={1}>
						{config.message.length}/100 characters
					</Text>

					<Text fontSize="sm" color="gray.500" mt={2}>
						Your message will be printed on a card and included with your chocolate.
					</Text>
				</Box>
			)}

			{messageOption === "custom" && (
				<Box mt={4}>
					<Text fontWeight="medium" mb={2}>
						Preview:
					</Text>
					<Box
						p={4}
						bg="#F5F0E8"
						borderRadius="md"
						borderWidth={1}
						borderColor="#E8DDD8"
						minHeight="80px"
						display="flex"
						alignItems="center"
						justifyContent="center">
						{config.message ? (
							<Text fontFamily="cursive" fontStyle="italic">
								"{config.message}"
							</Text>
						) : (
							<Text color="gray.500">No message added</Text>
						)}
					</Box>
				</Box>
			)}
		</VStack>
	);
}
