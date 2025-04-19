import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import {
	Box,
	Button,
	Container,
	Field,
	Input,
	Stack,
	Text,
	CloseButton,
	InputGroup,
	Heading,
	Spinner,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { LuMail, LuLock } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

import { Toaster } from "@/components/ui/toaster";
import { COLORS } from "@/constants/colors";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

// Enhanced fade transition
const pageTransition = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: "easeInOut",
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.4,
			ease: "easeInOut",
		},
	},
};

// Staggered animation for form elements
const formTransition = {
	initial: { opacity: 0, y: 10 },
	animate: (custom: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			delay: custom * 0.1,
			ease: "easeOut",
		},
	}),
};

export default function Login() {
	const navigate = useNavigate();
	const { unifiedLogin, isLoading } = useAuth();
	const { redirectAfterLogin } = useAuthRedirect();

	// Unified login state
	const [identifier, setIdentifier] = useState("");
	const [password, setPassword] = useState("");

	// Validation errors
	const [validationErrors, setValidationErrors] = useState<{
		[key: string]: string;
	}>({});

	const handleClose = () => {
		navigate(ROUTES.HOME);
	};

	// Handle login form submission
	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Reset validation errors
		setValidationErrors({});

		// Basic validation
		if (!identifier.trim()) {
			setValidationErrors((prev) => ({
				...prev,
				identifier: "Email or username is required",
			}));
			return;
		}

		if (!password) {
			setValidationErrors((prev) => ({
				...prev,
				password: "Password is required",
			}));
			return;
		}

		try {
			// Use the unified login method which handles both customer and admin authentication
			await unifiedLogin(identifier, password);
			redirectAfterLogin();
		} catch (error) {
			// Login failed, error is already handled by the auth context
			console.error("Login failed:", error);
		}
	};

	return (
		<>
			<Toaster />
			{/* Main container with gradient background */}
			<AnimatePresence mode="wait">
				<motion.div
					key="login-page"
					variants={pageTransition}
					initial="initial"
					animate="animate"
					exit="exit">
					<Container
						maxW="100vw"
						h="100vh"
						display="flex"
						position="relative"
						flexDirection="column"
						justifyContent="center"
						alignItems="center"
						background={COLORS.BACKGROUND_GRADIENT}>
						{/* Login form card with fade in animation */}
						<Box
							maxW={{ base: "100%", md: "80%", lg: "70%" }}
							w={{ base: "100%", md: "37%" }}
							maxH={{ base: "100%", md: "80%" }}
							aspectRatio={{ base: "1", md: "1.5" }}
							h={{ base: "100%", md: "80%" }}
							position="absolute"
							overflow={{ base: "auto", sm: "auto", md: "auto" }}
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

							<Stack gap={4} width="100%">
								{/* Form header with animation */}
								<motion.div
									custom={0}
									variants={formTransition}
									initial="initial"
									animate="animate">
									<Box textAlign="center" width="100%" mb={2}>
										<Text fontSize="2xl" fontWeight="bold" mb={2}>
											Welcome Back
										</Text>
										<Text fontSize="md" color="gray.600">
											Log in to your account
										</Text>
									</Box>
								</motion.div>

								{/* Single Login Form */}
								<form onSubmit={handleLogin} style={{ width: "100%" }}>
									<Stack gap={5}>
										{/* Email/Username field */}
										<motion.div
											custom={1}
											variants={formTransition}
											initial="initial"
											animate="animate">
											<Field.Root required>
												<Field.Label>
													Email or Username
													<Field.RequiredIndicator />
												</Field.Label>
												<InputGroup startElement={<LuMail />}>
													<Input
														type="text"
														placeholder="Enter your email or username"
														size="lg"
														value={identifier}
														onChange={(e) => setIdentifier(e.target.value)}
														disabled={isLoading}
													/>
												</InputGroup>
												{validationErrors.identifier && (
													<Text color="red.500" fontSize="sm">
														{validationErrors.identifier}
													</Text>
												)}
											</Field.Root>
										</motion.div>

										{/* Password field */}
										<motion.div
											custom={2}
											variants={formTransition}
											initial="initial"
											animate="animate">
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
														disabled={isLoading}
													/>
												</InputGroup>
												{validationErrors.password && (
													<Text color="red.500" fontSize="sm">
														{validationErrors.password}
													</Text>
												)}
											</Field.Root>
										</motion.div>

										{/* Login button */}
										<motion.div
											custom={3}
											variants={formTransition}
											initial="initial"
											animate="animate">
											<Button
												size="lg"
												width="100%"
												mt={4}
												background={COLORS.BRAND_PRIMARY}
												boxShadow={"md"}
												borderRadius={"6px"}
												type="submit"
												_active={{ scale: 0.98 }}
												as={motion.button}
												disabled={isLoading}>
												{isLoading ? <Spinner size="sm" color="white" mr={2} /> : null}
												Sign In
											</Button>
										</motion.div>

										{/* Sign up link */}
										<motion.div
											custom={4}
											variants={formTransition}
											initial="initial"
											animate="animate">
											<Heading
												as={"h4"}
												fontSize={"sm"}
												fontWeight={"normal"}
												textAlign={"center"}>
												Don't have an account?{" "}
												<RouterLink to={ROUTES.SIGNUP}>
													<motion.span
														style={{
															display: "inline-block",
															color: COLORS.BRAND_PRIMARY,
														}}
														whileHover={{
															scale: 1.03,
															fontWeight: "bold",
														}}
														whileTap={{ scale: 0.98 }}>
														Sign up
													</motion.span>
												</RouterLink>
											</Heading>
										</motion.div>
									</Stack>
								</form>
							</Stack>
						</Box>
					</Container>
				</motion.div>
			</AnimatePresence>
		</>
	);
}
