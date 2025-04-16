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
	Spinner,
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
import { useAuth } from "@/contexts/AuthContext";

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

export default function SignUp() {
	const navigate = useNavigate();
	const { signup, validateSignup } = useAuth();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [emailDomain, setEmailDomain] = useState(VALIDATION.EMAIL_DOMAINS.GMAIL);
	const [customDomain, setCustomDomain] = useState("");
	const [password, setPassword] = useState("");
	const [showCustomDomain, setShowCustomDomain] = useState(false);
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [validatingEmail, setValidatingEmail] = useState(false);
	const [validationErrors, setValidationErrors] = useState<{
		[key: string]: string;
	}>({});

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

	// Get full email with domain
	const getFullEmail = (): string => {
		return showCustomDomain
			? `${email}@${customDomain}`
			: `${email}${emailDomain}`;
	};

	// Check if an email is valid
	const isEmailValid = (email: string): boolean => {
		return VALIDATION.EMAIL.test(email);
	};

	// Validate the email on blur
	const validateEmailField = async () => {
		// Get the full email
		const fullEmail = getFullEmail();

		// Don't validate if email is empty or invalid format
		if (!fullEmail || !isEmailValid(fullEmail)) {
			return;
		}

		// Clear any previous validation errors
		setValidationErrors((prev) => ({ ...prev, email: undefined }));

		// Set validating state
		setValidatingEmail(true);

		try {
			// Validate the signup data, checking only the email
			const errors = await validateSignup(
				firstName || "Placeholder", // Send placeholder if empty
				lastName,
				fullEmail,
				"PlaceholderPassword123!" // Send placeholder password
			);

			// Find any email-related errors
			const emailError = errors.find((error) => error.field === "email");
			if (emailError) {
				setValidationErrors((prev) => ({ ...prev, email: emailError.message }));
			}
		} catch (error) {
			// Just log the error, don't block the form
			console.error("Email validation failed:", error);
		} finally {
			setValidatingEmail(false);
		}
	};

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();

		// Reset validation errors
		setValidationErrors({});

		// Check terms acceptance
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
			setValidationErrors((prev) => ({
				...prev,
				password: passwordValidation.message,
			}));
			toaster.create({
				title: "Invalid Password",
				description: passwordValidation.message,
				type: "error",
				duration: 3000,
			});
			return;
		}

		// Check if first name is provided
		if (!firstName.trim()) {
			setValidationErrors((prev) => ({
				...prev,
				firstName: "First name is required",
			}));
			toaster.create({
				title: "Error",
				description: "First name is required",
				type: "error",
				duration: 3000,
			});
			return;
		}

		// Construct full email with domain
		const fullEmail = getFullEmail();

		// Validate email format
		if (!isEmailValid(fullEmail)) {
			setValidationErrors((prev) => ({
				...prev,
				email: VALIDATION.ERROR_MESSAGES.INVALID_EMAIL,
			}));
			toaster.create({
				title: "Error",
				description: "Please enter a valid email address.",
				type: "error",
				duration: 3000,
			});
			return;
		}

		// Form data for registration
		const formData: FormData = {
			firstName,
			lastName,
			email: fullEmail,
			password,
		};

		try {
			setIsSubmitting(true);

			// First validate on the server
			const validationErrors = await validateSignup(
				formData.firstName,
				formData.lastName,
				formData.email,
				formData.password
			);

			// If there are validation errors, display them and stop
			if (validationErrors.length > 0) {
				const errorMap: { [key: string]: string } = {};

				// Map errors to their respective fields
				validationErrors.forEach((err) => {
					errorMap[err.field] = err.message;
				});

				// Set validation errors state
				setValidationErrors(errorMap);

				// Show the first error in a toast
				const firstError = validationErrors[0];
				toaster.create({
					title: "Validation Error",
					description: `${firstError.field}: ${firstError.message}`,
					type: "error",
					duration: 3000,
				});

				setIsSubmitting(false);
				return;
			}

			// If validation passes, proceed with signup
			await signup(
				formData.firstName,
				formData.lastName,
				formData.email,
				formData.password
			);

			// Display success message
			toaster.create({
				title: "Success",
				description: "Your account has been created! Redirecting...",
				type: "success",
				duration: 2500,
			});

			// Redirect after successful signup
			setTimeout(() => {
				navigate(ROUTES.HOME);
			}, 1000);
		} catch (error: any) {
			// Handle specific error messages from backend
			const errorMessage =
				error?.message || "Registration failed. Please try again.";

			toaster.create({
				title: "Registration Error",
				description: errorMessage,
				type: "error",
				duration: 3000,
			});

			console.error("Registration failed:", error);
		} finally {
			setIsSubmitting(false);
		}
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
										<motion.div
											custom={1}
											variants={formTransition}
											initial="initial"
											animate="animate">
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
														disabled={isSubmitting}
													/>
												</InputGroup>
											</Field.Root>
										</motion.div>

										{/* Last Name field */}
										<motion.div
											custom={2}
											variants={formTransition}
											initial="initial"
											animate="animate">
											<Field.Root>
												<Field.Label>Last Name</Field.Label>
												<InputGroup startElement={<LuUser />}>
													<Input
														placeholder="Enter your last name"
														size="lg"
														value={lastName}
														onChange={(e) => setLastName(e.target.value)}
														disabled={isSubmitting}
													/>
												</InputGroup>
											</Field.Root>
										</motion.div>

										{/* Email field with domain selection */}
										<motion.div
											custom={3}
											variants={formTransition}
											initial="initial"
											animate="animate">
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
																onBlur={validateEmailField}
																borderRightRadius={0}
																disabled={isSubmitting}
															/>
														</InputGroup>
														{validationErrors.email && (
															<Text color="red.500" fontSize="sm">
																{validationErrors.email}
															</Text>
														)}
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
																		disabled={isSubmitting}
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
																	_hover={{ bg: "gray.100" }}
																	disabled={isSubmitting}>
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
																	}}
																	disabled={isSubmitting}>
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
										<motion.div
											custom={4}
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
														disabled={isSubmitting}
													/>
												</InputGroup>
												<Field.HelperText fontSize={"x-small"}>
													Password must be at least {VALIDATION.PASSWORD.MIN_LENGTH}{" "}
													characters with uppercase, numbers, or special characters.
												</Field.HelperText>
												<PasswordStrengthMeter value={passwordStrength} width={"lg"} />
												{validationErrors.password && (
													<Text color="red.500" fontSize="sm">
														{validationErrors.password}
													</Text>
												)}
											</Field.Root>
										</motion.div>

										{/* Terms and conditions checkbox */}
										<motion.div
											custom={5}
											variants={formTransition}
											initial="initial"
											animate="animate">
											<TermDialog
												termsAccepted={termsAccepted}
												setTermsAccepted={setTermsAccepted}
											/>
										</motion.div>

										{/* Sign-up button */}
										<motion.div
											custom={6}
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
												disabled={isSubmitting}>
												{isSubmitting ? <Spinner size="sm" color="white" mr={2} /> : null}
												Sign Up
											</Button>
										</motion.div>

										{/* Login link with enhanced hover effect */}
										<motion.div
											custom={7}
											variants={formTransition}
											initial="initial"
											animate="animate">
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
					</Container>
				</motion.div>
			</AnimatePresence>
		</>
	);
}
