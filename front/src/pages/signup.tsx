"use client";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import {
	Box,
	Button,
	Checkbox,
	Container,
	Field,
	Input,
	Stack,
	Text,
	Link,
	CloseButton,
	InputGroup,
	Heading,
	NativeSelect,
} from "@chakra-ui/react";
import { LuUser, LuMail, LuLock } from "react-icons/lu";
import {
	PasswordInput,
	PasswordStrengthMeter,
} from "@/components/ui/password-input";
import { Toaster, toaster } from "@/components/ui/toaster";
import { COLORS } from "@/constants/colors";
import { ROUTES } from "@/constants/routes";
import { VALIDATION } from "@/constants/validation";

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
			<Container
				maxW="100vw"
				h="100vh"
				display="flex"
				position="relative"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				background={`linear-gradient(to right, ${COLORS.BRAND_LIGHT}, ${COLORS.BRAND_SECONDARY}, ${COLORS.BRAND_TERTIARY}, ${COLORS.BRAND_QUATERNARY})`}>
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
						<Box textAlign="center" width="100%">
							<Text fontSize="2xl" fontWeight="bold" mb={2}>
								Create Account
							</Text>
							<Text fontSize="md" color="gray.600">
								Create your custom chocolate experience today!
							</Text>
						</Box>
						<form onSubmit={handleSubmit} style={{ width: "100%" }}>
							<Stack gap={6}>
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
								<Field.Root required>
									<Field.Label>
										Last Name
										<Field.RequiredIndicator />
									</Field.Label>
									<InputGroup startElement={<LuUser />}>
										<Input
											placeholder="Enter your last name"
											size="lg"
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
										/>
									</InputGroup>
								</Field.Root>
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
														<option value={VALIDATION.EMAIL_DOMAINS.GMAIL}>@gmail.com</option>
														<option value={VALIDATION.EMAIL_DOMAINS.YAHOO}>@yahoo.com</option>
														<option value={VALIDATION.EMAIL_DOMAINS.OUTLOOK}>
															@outlook.com
														</option>
														<option value={VALIDATION.EMAIL_DOMAINS.CUSTOM}>Custom...</option>
													</NativeSelect.Field>
													<NativeSelect.Indicator />
												</NativeSelect.Root>
											)}
										</Box>
									</Box>
								</Field.Root>
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

								<Checkbox.Root
									checked={termsAccepted}
									onCheckedChange={(e) => setTermsAccepted(!!e.checked)}>
									<Checkbox.HiddenInput />
									<Checkbox.Control
										background={COLORS.BRAND_PRIMARY}
										borderRadius={"6px"}
									/>
									<Checkbox.Label>
										I agree to the{" "}
										<Link
											href="#"
											color={COLORS.BRAND_PRIMARY}
											_hover={{ fontWeight: "bold", color: COLORS.BRAND_PRIMARY }}>
											terms and conditions
										</Link>
									</Checkbox.Label>
								</Checkbox.Root>
								<Button
									size="lg"
									width="100%"
									mt={4}
									background={COLORS.BRAND_PRIMARY}
									boxShadow={"md"}
									borderRadius={"6px"}
									type="submit">
									Sign Up
								</Button>
								<Heading
									as={"h4"}
									fontSize={"sm"}
									fontWeight={"normal"}
									textAlign={"center"}>
									Already registered?{" "}
									<Link
										color={COLORS.BRAND_PRIMARY}
										href="#"
										_hover={{ fontWeight: "bold", color: COLORS.BRAND_PRIMARY }}>
										Log in
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
