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
	RadioGroup,
	HStack,
	Skeleton,
} from "@chakra-ui/react";
import { ChocolateConfig } from "../../../../hooks/useChocolateConfigurator";
import { formatPrice } from "../../../../utils/func/priceCalculator";
import { useChocolateOptions } from "../../../../hooks/useChocolateOptions";

interface StepFiveProps {
	config: ChocolateConfig;
	updateMessage: (message: string) => void;
	updateMessageFont?: (font: string) => void;
}

const MAX_MESSAGE_LENGTH = 100;

// Available font options for message customization
const FONT_OPTIONS = [
	{ value: "cursive", label: "Handwritten", fontFamily: "cursive" },
	{ value: "serif", label: "Elegant", fontFamily: "Georgia, serif" },
	{ value: "sans-serif", label: "Modern", fontFamily: "Helvetica, sans-serif" },
	{ value: "monospace", label: "Classic", fontFamily: "monospace" },
	{ value: "fantasy", label: "Playful", fontFamily: "fantasy, cursive" },
];

export default function StepFive({
	config,
	updateMessage,
	updateMessageFont = () => {},
}: StepFiveProps) {
	const [messageOption, setMessageOption] = React.useState(
		config.message ? "custom" : "none"
	);

	// State for selected font, default to cursive if not set in config
	const [selectedFont, setSelectedFont] = React.useState(
		config.messageFont || "cursive"
	);

	// Use the hook to get pricing data
	const { pricing, isLoading, isError, error } = useChocolateOptions();

	// Message options with proper data from API
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
			description:
				"Add a personalized message to make your gift special. Base price plus per-character fee.",
			image: "/images/message-custom.jpg",
			price: pricing?.messageBasePrice || 1.99,
		},
	];

	// Calculate the current message price based on length
	const calculateMessagePrice = (message: string): number => {
		if (!message || !pricing) return 0;
		return pricing.messageBasePrice + message.length * pricing.messageCharPrice;
	};

	// Current price based on message length
	const currentMessagePrice = calculateMessagePrice(config.message);

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

	// Handle font selection change
	const handleFontChange = (event: React.FormEvent<HTMLDivElement>) => {
		const value = (event.target as HTMLInputElement).value;
		setSelectedFont(value);
		updateMessageFont(value);
	};

	// Get the current font family based on selection
	const getCurrentFontFamily = () => {
		const fontOption = FONT_OPTIONS.find((font) => font.value === selectedFont);
		return fontOption?.fontFamily || "cursive";
	};

	if (isLoading) {
		return (
			<VStack gap={6} align="stretch">
				<Text color="#604538">Loading message options...</Text>
				<Skeleton height="200px" borderRadius="lg" />
			</VStack>
		);
	}

	if (isError) {
		return (
			<VStack gap={6} align="stretch">
				<Text color="red.500">{error}</Text>
				<Box
					p={4}
					bg="red.50"
					borderRadius="md"
					borderWidth={1}
					borderColor="red.200">
					<Text>
						We're having trouble loading message options. Please check your connection
						or try again later.
					</Text>
				</Box>
			</VStack>
		);
	}

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
							<Badge
								position="absolute"
								top={2}
								left={2}
								bg={price === 0 ? "green.500" : "orange.500"}
								color="white"
								px={2}
								py={1}
								borderRadius="md">
								{price === 0 ? "Free" : `From ${formatPrice(price)}`}
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
						<Badge colorScheme="orange">+{formatPrice(currentMessagePrice)}</Badge>
					</Flex>
					<Textarea
						value={config.message}
						onChange={handleCustomMessageChange}
						placeholder="Write your message here (max 100 characters)"
						maxLength={MAX_MESSAGE_LENGTH}
						rows={3}
						borderColor="#E8DDD8"
						_hover={{ borderColor: "#A47864" }}
						_focus={{ borderColor: "#604538", boxShadow: "0 0 0 1px #604538" }}
					/>
					<Flex justifyContent="space-between" alignItems="center" mt={1}>
						<Text fontSize="xs" color="gray.500">
							{config.message.length}/{MAX_MESSAGE_LENGTH} characters
						</Text>
						<Text fontSize="xs" color="gray.500">
							{formatPrice(pricing?.messageBasePrice || 1.99)} base +
							{formatPrice(pricing?.messageCharPrice || 0.15)}/character
						</Text>
					</Flex>

					{/* Font selection - Updated to use proper RadioGroup structure */}
					<Box mt={4} borderTopWidth="1px" borderColor="#E8DDD8" pt={3}>
						<Text fontWeight="medium" color="#604538" mb={2}>
							Select Font Style
						</Text>
						<RadioGroup.Root
							value={selectedFont}
							onChange={handleFontChange}
							colorPalette="brown"
							size="md">
							<HStack gap={4} wrap="wrap">
								{FONT_OPTIONS.map((font) => (
									<Box
										key={font.value}
										borderWidth="1px"
										borderRadius="md"
										borderColor={selectedFont === font.value ? "#A47864" : "#E8DDD8"}
										bg={selectedFont === font.value ? "#F5F0E8" : "white"}
										p={2}>
										<RadioGroup.Item value={font.value}>
											<RadioGroup.ItemHiddenInput />
											<RadioGroup.ItemIndicator />
											<RadioGroup.ItemText fontFamily={font.fontFamily}>
												{font.label}
											</RadioGroup.ItemText>
										</RadioGroup.Item>
									</Box>
								))}
							</HStack>
						</RadioGroup.Root>
					</Box>

					{/* Price breakdown */}
					{config.message.length > 0 && pricing && (
						<Box mt={3} p={2} bg="#F5F0E8" borderRadius="md">
							<Flex justifyContent="space-between" fontSize="xs">
								<Text>Base price:</Text>
								<Text>{formatPrice(pricing.messageBasePrice)}</Text>
							</Flex>
							<Flex justifyContent="space-between" fontSize="xs">
								<Text>
									{config.message.length} characters ×{" "}
									{formatPrice(pricing.messageCharPrice)}:
								</Text>
								<Text>
									{formatPrice(config.message.length * pricing.messageCharPrice)}
								</Text>
							</Flex>
							<Flex
								justifyContent="space-between"
								fontWeight="bold"
								fontSize="sm"
								mt={1}
								pt={1}
								borderTopWidth="1px"
								borderColor="#E8DDD8">
								<Text>Total message price:</Text>
								<Text>{formatPrice(currentMessagePrice)}</Text>
							</Flex>
						</Box>
					)}

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
							<Text fontFamily={getCurrentFontFamily()} fontStyle="italic">
								" {config.message} "
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
