import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
	Box,
	Button,
	Container,
	Field,
	Input,
	Stack,
	Text,
	Link,
	CloseButton,
	InputGroup,
	Heading,
} from "@chakra-ui/react";

import { LuMail, LuLock } from "react-icons/lu";
import { PasswordInput } from "@/components/ui/password-input";
import { Toaster, toaster } from "@/components/ui/toaster";
import { COLORS } from "@/constants/colors";
import { ROUTES } from "@/constants/routes";
import { VALIDATION } from "@/constants/validation";

export default function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [termsAccepted, setTermsAccepted] = useState(false);

	const handleClose = () => {
		navigate(ROUTES.HOME);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		// Check if email is valid
		if (!VALIDATION.EMAIL.test(email)) {
			toaster.create({
				title: "Error",
				description: "Please enter a valid email address.",
				type: "error",
				duration: 3000,
			});
			setTimeout(() => {
				setEmail("");
			}, 1300);
			return;
		}
		if (!termsAccepted) {
			toaster.create({
				title: "Error",
				description: VALIDATION.ERROR_MESSAGES.TERMS_REQUIRED,
				type: "error",
				duration: 3000,
			});
			setTimeout(() => {
				setTermsAccepted(false);
			}, 1300);
			return;
		}
		toaster.create({
			title: "Success",
			description: "login successfully!",
			type: "success",
			duration: 3000,
		});
		setTimeout(() => {
			navigate(ROUTES.HOME);
		}, 1300);
	};

	return (
		<>
			<Toaster />
			{/* Main container with gradient background */}
			<Container
				maxW="100vw"
				h="100vh"
				display="flex"
				position="relative"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				background={`linear-gradient(to right, ${COLORS.BRAND_LIGHT}, ${COLORS.BRAND_SECONDARY}, ${COLORS.BRAND_TERTIARY}, ${COLORS.BRAND_QUATERNARY})`}>
				{/* Login form card */}
				<Box
					maxW={{ base: "100%", md: "80%", lg: "70%" }}
					w={{ base: "100%", md: "37%" }}
					maxH={{ base: "100%", md: "80%" }}
					aspectRatio={{ base: "1", md: "1.5" }}
					h={{ base: "100%", md: "80%" }}
					position="absolute"
					overflow={{ base: "auto", sm: "auto", md: "hidden" }}
					top={{ base: "0", md: "50%" }}
					left={{ base: "0", md: "50%" }}
					transform={{ base: "translate(0, 0)", md: "translate(-50%, -50%)" }}
					boxShadow="lg"
					p={{ base: 6, md: "6%" }}
					background="white"
					display="flex"
					justifyContent="center"
					alignItems="center"
					borderRadius={{ base: "0px", md: "20px" }}>
					{/* Close button in the top-right corner */}
					<CloseButton
						position="absolute"
						top="15px"
						right="15px"
						size="md"
						onClick={handleClose}
						zIndex={2}
						color="gray.600"
						background={"transparent"}
						_hover={{ color: "gray.800" }}
					/>

					<Stack gap={6} width="100%">
						{/* Form header */}
						<Box textAlign="center" width="100%">
							<Text fontSize="2xl" fontWeight="bold" mb={2}>
								Login
							</Text>
							<Text fontSize="md" color="gray.600">
								Start create your custom chocolate experience today!
							</Text>
						</Box>
						{/* Login form */}
						<form onSubmit={handleSubmit} style={{ width: "100%" }}>
							<Stack gap={6}>
								{/* Email field */}
								<Field.Root required>
									<Field.Label>
										Email
										<Field.RequiredIndicator />
									</Field.Label>
									<Box display="flex" width="100%">
										<Box width="100%" position="relative">
											<InputGroup startElement={<LuMail />}>
												<Input
													type="text"
													placeholder="Enter your email"
													size="lg"
													value={email}
													onChange={(e) => setEmail(e.target.value)}
													borderRightRadius={0}
												/>
											</InputGroup>
										</Box>
									</Box>
								</Field.Root>
								{/* Password field */}
								<Field.Root required>
									<Field.Label>
										Password
										<Field.RequiredIndicator />
									</Field.Label>
									<InputGroup startElement={<LuLock />}>
										<PasswordInput
											placeholder="Enter your password"
											size="lg"
											value={password}
											bg={"white"}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</InputGroup>
								</Field.Root>
								{/* Login button */}
								<Button
									size="lg"
									width="100%"
									mt={4}
									background={COLORS.BRAND_PRIMARY}
									boxShadow={"md"}
									borderRadius={"6px"}
									type="submit">
									Login
								</Button>
								{/* Sign-up link */}
								<Heading
									as={"h4"}
									fontSize={"sm"}
									fontWeight={"normal"}
									textAlign={"center"}>
									Not Have an account?{" "}
									<Link
										color={COLORS.BRAND_PRIMARY}
										href={ROUTES.SIGNUP}
										_hover={{ fontWeight: "bold", color: COLORS.BRAND_PRIMARY }}>
										Sign Up
									</Link>
								</Heading>
							</Stack>
						</form>
					</Stack>
				</Box>
			</Container>
		</>
	);
}
