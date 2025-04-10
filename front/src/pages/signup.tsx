import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useState, useMemo } from "react";
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
	NativeSelect,
} from "@chakra-ui/react";
import {
	PasswordInput,
	PasswordStrengthMeter,
} from "@/components/ui/password-input";
import { LuUser, LuMail, LuLock } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

import { Toaster, toaster } from "@/components/ui/toaster";
import { COLORS } from "@/constants/colors";
import { ROUTES } from "@/constants/routes";
import { VALIDATION } from "@/constants/validation";
import TermDialog from "@/components/common/TermDialog";

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
		}
	}),
};

export default function SignUp() {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [emailDomain, setEmailDomain] = useState(VALIDATION.EMAIL_DOMAINS.GMAIL);
	const [customDomain, setCustomDomain] = useState("");
	const [password, setPassword] = useState("");
	const [showCustomDomain, setShowCustomDomain] = useState(false);
	const [termsAccepted, setTermsAccepted] = useState(false);

	// Calculate password strength
	const calculatePasswordStrength = (password: string): number => {
		if (!password) return 0; // Empty password

		let strength = 0;

		if (password.length >= 8) strength += 1;
		if (password.length >= 12) strength += 1;
		if (new Set(password).size >= 5) {
			strength += 1; // Unique characters
		} else {
			strength -= 1; // Not enough unique characters
		}

		if (/[A-Z]/.test(password)) strength += 1; // Uppercase
		if (/[0-9]/.test(password)) strength += 1; // Numbers
		if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Special characters

		// Cap strength at 4
		return Math.min(4, strength);
	};
	const passwordStrength = useMemo(
		() => calculatePasswordStrength(password),
		[password]
	);

	const handleClose = () => {
		navigate(ROUTES.HOME);
	};

	interface FormData {
		firstName: string;
		lastName: string;
		email: string;
		password: string;
	}

	// Validate password meets requirements
	const validatePassword = (): { isValid: boolean; message: string } => {
		if (password.length < VALIDATION.PASSWORD.MIN_LENGTH) {
			return {
				isValid: false,
				message: VALIDATION.ERROR_MESSAGES.PASSWORD_TOO_SHORT,
			};
		}

		if (passwordStrength < VALIDATION.PASSWORD.MIN_STRENGTH) {
			return {
				isValid: false,
				message: VALIDATION.ERROR_MESSAGES.PASSWORD_TOO_WEAK,
			};
		}

		return { isValid: true, message: "" };
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (!termsAccepted) {
			toaster.create({
				title: "Please check the terms",
				description: VALIDATION.ERROR_MESSAGES.TERMS_REQUIRED,
				type: "error",
				duration: 3000,
			});
			return;
		}

		// Validate password
		const passwordValidation = validatePassword();
		if (!passwordValidation.isValid) {
			toaster.create({
				title: "Invalid Password",
				description: passwordValidation.message,
				type: "error",
				duration: 3000,
			});
			return;
		}

		// Construct full email with domain
		const fullEmail = showCustomDomain
			? `${email}@${customDomain}`
			: `${email}${emailDomain}`;

		// Log all form data
		const formData: FormData = {
			firstName,
			lastName,
			email: fullEmail,
			password,
		};
		console.log(formData);

		// Show success message
		toaster.create({
			title: "Success",
			description: "Account created successfully!",
			type: "success",
			duration: 3000,
		});

		// Redirect after successful signup
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
					key="signup-page"
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
						{/* Sign-up form card with fade in animation */}
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
									<motion.div custom={0} variants={formTransition} initial="initial" animate="animate">
										<Box textAlign="center" width="100%">
											<Text fontSize="2xl" fontWeight="bold" mb={2}>
												Create Account
											</Text>
											<Text fontSize="md" color="gray.600">
												Create your custom chocolate experience today!
											</Text>
										</Box>
									</motion.div>
									
									{/* Registration form with staggered animation for children */}
									<form onSubmit={handleSubmit} style={{ width: "100%" }}>
										<Stack gap={6}>
											{/* First Name field */}
											<motion.div custom={1} variants={formTransition} initial="initial" animate="animate">
												<Field.Root required>
													<Field.Label>
														First Name
														<Field.RequiredIndicator />
													</Field.Label>
													<InputGroup startElement={<LuUser />}>
														<Input
															placeholder="Enter your first name"
															size="lg"
															value={firstName}
															onChange={(e) => setFirstName(e.target.value)}
														/>
													</InputGroup>
												</Field.Root>
											</motion.div>
											
											{/* Last Name field */}
											<motion.div custom={2} variants={formTransition} initial="initial" animate="animate">
												<Field.Root>
													<Field.Label>Last Name</Field.Label>
													<InputGroup startElement={<LuUser />}>
														<Input
															placeholder="Enter your last name"
															size="lg"
															value={lastName}
															onChange={(e) => setLastName(e.target.value)}
														/>
													</InputGroup>
												</Field.Root>
											</motion.div>
											
											{/* Email field with domain selection */}
											<motion.div custom={3} variants={formTransition} initial="initial" animate="animate">
												<Field.Root required>
													<Field.Label>
														Email
														<Field.RequiredIndicator />
													</Field.Label>
													<Box display="flex" width="100%">
														<Box width="50%" position="relative">
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
														<Box width="50%">
															{showCustomDomain ? (
																<Box position="relative">
																	<InputGroup>
																		<Input
																			type="text"
																			placeholder="@example.com"
																			size="lg"
																			value={customDomain ? `@${customDomain}` : ""}
																			onChange={(e) => {
																				// Remove @ if user types it
																				const value = e.target.value.startsWith("@")
																					? e.target.value.substring(1)
																					: e.target.value;
																				setCustomDomain(value);
																			}}
																			borderLeftRadius={0}
																		/>
																	</InputGroup>
																	<Button
																		position="absolute"
																		right="0"
																		size="sm"
																		zIndex={2}
																		h="100%"
																		onClick={() => setShowCustomDomain(false)}
																		bg="transparent"
																		_hover={{ bg: "gray.100" }}>
																		↺
																	</Button>
																</Box>
															) : (
																<NativeSelect.Root size="lg" width="full">
																	<NativeSelect.Field
																		value={emailDomain}
																		borderLeftRadius={0}
																		onChange={(e) => {
																			const value = e.target.value;
																			if (value === VALIDATION.EMAIL_DOMAINS.CUSTOM) {
																				setShowCustomDomain(true);
																				setEmailDomain("");
																			} else {
																				setEmailDomain(value);
																			}
																		}}>
																		<option value={VALIDATION.EMAIL_DOMAINS.GMAIL}>
																			@gmail.com
																		</option>
																		<option value={VALIDATION.EMAIL_DOMAINS.YAHOO}>
																			@yahoo.com
																		</option>
																		<option value={VALIDATION.EMAIL_DOMAINS.OUTLOOK}>
																			@outlook.com
																		</option>
																		<option value={VALIDATION.EMAIL_DOMAINS.CUSTOM}>
																			Custom...
																		</option>
																	</NativeSelect.Field>
																	<NativeSelect.Indicator />
																</NativeSelect.Root>
															)}
														</Box>
													</Box>
												</Field.Root>
											</motion.div>
											
											{/* Password field with strength meter */}
											<motion.div custom={4} variants={formTransition} initial="initial" animate="animate">
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
													<Field.HelperText fontSize={"x-small"}>
														Password must be at least {VALIDATION.PASSWORD.MIN_LENGTH} characters
														with uppercase, numbers, or special characters.
													</Field.HelperText>
													<PasswordStrengthMeter value={passwordStrength} width={"lg"} />
												</Field.Root>
											</motion.div>

											{/* Terms and conditions checkbox */}
											<motion.div custom={5} variants={formTransition} initial="initial" animate="animate">
												<TermDialog
													termsAccepted={termsAccepted}
													setTermsAccepted={setTermsAccepted}
												/>
											</motion.div>
											
											{/* Sign-up button */}
											<motion.div custom={6} variants={formTransition} initial="initial" animate="animate">
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
													Sign Up
												</Button>
											</motion.div>
											
											{/* Login link with enhanced hover effect */}
											<motion.div custom={7} variants={formTransition} initial="initial" animate="animate">
												<Heading
													as={"h4"}
													fontSize={"sm"}
													fontWeight={"normal"}
													textAlign={"center"}>
													Already registered?{" "}
													<RouterLink to={ROUTES.LOGIN}>
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
															Log in
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
