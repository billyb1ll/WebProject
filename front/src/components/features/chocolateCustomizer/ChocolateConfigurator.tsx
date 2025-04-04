import {
	Box,
	Flex,
	Heading,
	Button,
	HStack,
	Text,
	Spinner,
	Center,
	VStack,
} from "@chakra-ui/react";
import ChocolateViewer from "./ChocolateViewer";
import { useChocolateConfigurator } from "../../../hooks/useChocolateConfigurator";
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

	// Calculate progress percentage
	const progressPercentage = Math.max(
		0,
		Math.min(100, ((currentStep - 1) / 4) * 100)
	);

	// Calculate price for the current configuration
	const { subtotal } = calculatePrice(config);

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
				return <StepFour config={config} updatePackaging={updatePackaging} />;
			case 5:
				return (
					<StepFive
						config={config}
						updateMessage={updateMessage}
						updateMessageFont={updateMessageFont}
					/>
				);
			default:
				return <StepOne config={config} updateType={updateType} />;
		}
	};

	return (
		<Box>
			{/* Progress indicator */}
			<Box mb={6}>
				{/* Progress bar */}
				<Box position="relative" height="8px" bg="#E8DDD8" borderRadius="md" mb={4}>
					<Box
						bg="#A47864"
						height="100%"
						width={`${progressPercentage}%`}
						borderRadius="md"
						transition="width 0.3s ease-in-out"
					/>
				</Box>

				{/* Step indicators */}
				<HStack justify="space-between" px={2}>
					{[1, 2, 3, 4, 5].map((step) => (
						<Box key={step} textAlign="center" position="relative" width="60px">
							<Box
								width={{ base: "20px", md: "30px" }}
								height="20px"
								borderRadius="full"
								bg={step <= currentStep ? "#A47864" : "gray.200"}
								display="flex"
								alignItems="center"
								justifyContent="center"
								mx="auto"
								mb={1}
								transition="all 0.2s">
								{step < currentStep && (
									<Text fontSize="xs" color="white" fontWeight="bold">
										✓
									</Text>
								)}
							</Box>
							<Text
								fontSize="xs"
								color={step <= currentStep ? "#604538" : "gray.400"}
								fontWeight={step === currentStep ? "bold" : "normal"}>
								Step {step}
							</Text>
						</Box>
					))}
				</HStack>
			</Box>

			<Flex direction={{ base: "column", lg: "row" }} gap={8} align="start">
				{/* Left section: 3D Viewer */}
				<Box flex="3">
					<ChocolateViewer config={config} />
				</Box>

				{/* Right section: Current step controls */}
				<Box flex="2">
					<Heading as="h3" size="lg" mb={6} color="#604538" textAlign="center">
						Step {currentStep}: {stepTitles[currentStep - 1]}
					</Heading>

					{renderStep()}

					{/* Navigation buttons */}
					<Flex justify="space-between" mt={6}>
						<Button
							onClick={prevStep}
							disabled={currentStep === 1}
							variant="outline"
							color="#604538"
							borderColor="#604538"
							bg="white"
							_hover={{ bg: "#E8DDD8" }}
							size="lg"
							width="120px">
							Back
						</Button>

						<Button
							onClick={nextStep}
							colorScheme="brown"
							bg="#604538"
							color="white"
							_hover={{ bg: "#3A2213" }}
							size="lg"
							width="120px"
							disabled={currentStep === 5}>
							{currentStep === 5 ? "Finish" : "Next"}
						</Button>
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
							Add to Cart - {formatPrice(subtotal)}
						</Button>
					)}
				</Box>
			</Flex>
		</Box>
	);
}
