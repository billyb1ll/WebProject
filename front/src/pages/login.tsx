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
} from "@chakra-ui/react";

import { LuMail, LuLock } from "react-icons/lu";
import { PasswordInput } from "@/components/ui/password-input";
import { Toaster, toaster } from "@/components/ui/toaster";
import { COLORS } from "@/constants/colors";
import { ROUTES } from "@/constants/routes";
import { VALIDATION } from "@/constants/validation";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced fade transition with staggered children animation
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
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

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
		toaster.create({
			title: "Success",
			description: "Login successful!",
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
						background={`${COLORS.BACKGROUND_GRADIENT}`}>
						{/* Login form card with fade in animation */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							style={{ width: "100%" }}>
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
									{/* Form header with animation */}
									<motion.div
										custom={0}
										variants={formTransition}
										initial="initial"
										animate="animate">
										<Box textAlign="center" width="100%">
											<Text fontSize="2xl" fontWeight="bold" mb={2}>
												Login
											</Text>
											<Text fontSize="md" color="gray.600">
												Start create your custom chocolate experience today!
											</Text>
										</Box>
									</motion.div>

									{/* Login form with staggered animation for children */}
									<form onSubmit={handleSubmit} style={{ width: "100%" }}>
										<Stack gap={6}>
											{/* Email field */}
											<motion.div
												custom={1}
												variants={formTransition}
												initial="initial"
												animate="animate">
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
														/>
													</InputGroup>
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
													as={motion.button}>
													Login
												</Button>
											</motion.div>

											{/* Sign-up link with enhanced hover effect */}
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
													Not Have an account?{" "}
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
															Sign Up
														</motion.span>
													</RouterLink>
												</Heading>
											</motion.div>
										</Stack>
									</form>
								</Stack>
							</Box>
						</motion.div>
					</Container>
				</motion.div>
			</AnimatePresence>
		</>
	);
}
