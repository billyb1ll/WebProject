import {
	Box,
	Flex,
	Heading,
	Button,
	Text,
	Spinner,
	Center,
	VStack,
	Steps,
	ButtonGroup,
} from "@chakra-ui/react";
import ChocolateViewer from "./ChocolateViewer";
import {
	useChocolateConfigurator,
	PackagingType,
} from "../../../hooks/useChocolateConfigurator";
import {
	calculatePrice,
	formatPrice,
} from "../../../utils/func/priceCalculator";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import StepFour from "./steps/StepFour";
import StepFive from "./steps/StepFive";
import { useChocolateOptions } from "../../../hooks/useChocolateOptions";
import { useEffect, useState, useCallback } from "react";

export default function ChocolateConfigurator() {
	const {
		config,
		currentStep,
		nextStep,
		prevStep,
		updateType,
		toggleTopping,
		updateShape,
		updatePackaging,
		updateMessage,
		updateMessageFont,
	} = useChocolateConfigurator();

	// Use the chocolate options hook to preload all data
	const { isLoading, isError, error } = useChocolateOptions();

	// State to store price calculation
	const [priceInfo, setPriceInfo] = useState({ subtotal: 0, details: {} });

	// Create a memoized function to calculate price
	const recalculatePrice = useCallback(() => {
		const result = calculatePrice(config);
		// Using timeouts can sometimes help with state batching issues
		setTimeout(() => {
			setPriceInfo(result);
		}, 0);
	}, [config]);

	// Force price update whenever any part of config changes
	useEffect(() => {
		// Extract toppings as string for dependency tracking
		recalculatePrice();
	}, [
		config.chocolateType,
		config.shape,
		config.packaging,
		config.message,
		config.messageFont,
		config.toppings,
		recalculatePrice,
	]);

	// Additional effect specifically for message changes
	useEffect(() => {
		// This is specifically to catch message updates
		recalculatePrice();
	}, [config.message, recalculatePrice]);

	// Show loading state while fetching initial data
	if (isLoading) {
		return (
			<Center height="400px">
				<VStack gap={4}>
					<Spinner size="xl" color="#A47864" />
					<Text color="#604538">Loading chocolate configurator...</Text>
				</VStack>
			</Center>
		);
	}

	// Show error state if data loading failed
	if (isError) {
		return (
			<Center height="400px">
				<Box
					p={6}
					bg="red.50"
					borderRadius="lg"
					borderWidth={1}
					borderColor="red.200"
					maxWidth="600px"
					textAlign="center">
					<Heading as="h3" size="md" mb={4} color="red.600">
						Error Loading Data
					</Heading>
					<Text>{error}</Text>
					<Button mt={4} colorScheme="red" onClick={() => window.location.reload()}>
						Refresh Page
					</Button>
				</Box>
			</Center>
		);
	}

	// Wrapper for message updates to ensure price recalculation
	const handleMessageUpdate = (message: string) => {
		updateMessage(message);
		// Force an immediate price recalculation
		setTimeout(recalculatePrice, 10);
	};

	// Wrapper for packaging updates to ensure price recalculation
	const handlePackagingUpdate = (packaging: PackagingType) => {
		console.debug(`ChocolateConfigurator: Updating packaging to ${packaging}`);

		// Update the packaging in the chocolate config
		updatePackaging(packaging);

		// Force an immediate price recalculation - using a more reliable approach
		setTimeout(() => {
			console.debug(
				`ChocolateConfigurator: Config packaging after update: ${config.packaging}`
			);
			// Force price recalculation after packaging update
			const newConfig = { ...config, packaging }; // Create new config with updated packaging
			const result = calculatePrice(newConfig);
			console.debug(
				`ChocolateConfigurator: New price after packaging update:`,
				result
			);
			setPriceInfo(result);
		}, 10);
	};

	// Step titles for display
	const stepTitles = [
		"Choose Chocolate Base",
		"Add Toppings",
		"Select Shape",
		"Choose Packaging",
		"Add Personal Message",
	];

	// Render current step component
	const renderStep = () => {
		switch (currentStep) {
			case 1:
				return <StepOne config={config} updateType={updateType} />;
			case 2:
				return <StepTwo config={config} toggleTopping={toggleTopping} />;
			case 3:
				return <StepThree config={config} updateShape={updateShape} />;
			case 4:
				return <StepFour config={config} updatePackaging={handlePackagingUpdate} />;
			case 5:
				return (
					<StepFive
						config={config}
						updateMessage={handleMessageUpdate}
						updateMessageFont={updateMessageFont}
					/>
				);
			default:
				return <StepOne config={config} updateType={updateType} />;
		}
	};

	return (
		<Box>
			{/* Steps progress at the top */}
			<Box mb={6}>
				<Steps.Root
					defaultStep={currentStep - 1}
					count={stepTitles.length}
					colorPalette="orange"
					variant="subtle"
					size="md"
					step={currentStep - 1}
					onStepChange={(details) => {
						if (details.step + 1 < currentStep) {
							// Allow going back
							prevStep();
						} else if (details.step + 1 > currentStep) {
							// Allow going forward
							nextStep();
						}
					}}>
					<Steps.List>
						{stepTitles.map((title, index) => (
							<Steps.Item key={index} index={index} title={title}>
								<Steps.Indicator />
								<Steps.Title>{title}</Steps.Title>
								<Steps.Separator />
							</Steps.Item>
						))}
					</Steps.List>
				</Steps.Root>
			</Box>

			{/* Main content area: Viewer on left, Step content on right */}
			<Flex direction={{ base: "column", lg: "row" }} gap={8} align="start">
				{/* Left section: 3D Viewer */}
				<Box flex="1" minWidth={{ base: "100%", lg: "50%" }}>
					<ChocolateViewer config={config} />
				</Box>

				{/* Right section: Current step controls */}
				<Box flex="2" minWidth={{ base: "100%", lg: "40%" }}>
					<Heading as="h3" size="lg" mb={6} color="#604538" textAlign="center">
						Step {currentStep}: {stepTitles[currentStep - 1]}
					</Heading>
					{/* Current step content */}
					<Box
						mb={6}
						p={4}
						borderWidth="0px"
						borderRadius="lg"
						bg="white"
						padding={1}>
						{renderStep()}
					</Box>

					{/* Navigation buttons */}
					<Flex justify="space-between" mt={6}>
						<ButtonGroup
							size="lg"
							variant="outline"
							flex="1"
							gap={4}
							justifyContent="space-between">
							<Button
								color="#604538"
								borderColor="#604538"
								bg="white"
								_hover={{ bg: "#E8DDD8" }}
								width="120px"
								disabled={currentStep === 1}
								onClick={prevStep}>
								Back
							</Button>

							<Button
								colorScheme="brown"
								bg="#604538"
								color="white"
								_hover={{ bg: "#3A2213" }}
								width="120px"
								disabled={currentStep === 5}
								onClick={nextStep}>
								{currentStep === 5 ? "Finish" : "Next"}
							</Button>
						</ButtonGroup>
					</Flex>

					{/* Order button on last step */}
					{currentStep === 5 && (
						<Button
							colorScheme="brown"
							bg="#A47864"
							color="white"
							_hover={{ bg: "#604538" }}
							size="lg"
							width="100%"
							mt={4}>
							Add to Cart - {formatPrice(priceInfo.subtotal)}
						</Button>
					)}
				</Box>
			</Flex>
		</Box>
	);
}
