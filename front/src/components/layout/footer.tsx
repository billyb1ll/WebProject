import {
	Box,
	Button,
	IconButton,
	Text,
	HStack,
	Link,
	Field,
	Input,
	InputGroup,
	Heading,
	useBreakpointValue,
	Flex,
} from "@chakra-ui/react";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useForm } from "react-hook-form";

const Footer = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<{ email: string }>();

	const inputWidth = useBreakpointValue({ base: "100%", md: "70%" });

	const Subscribe = (data: { email: string }): void => {
		// Handle the subscription logic here
		if (!data.email) {
			toaster.create({
				title: "Error",
				description: "Please enter a valid email address.",
				type: "error",
			});
			return;
		}
		// Simulate a successful subscription
		console.log("Email subscribed:", data.email);
		toaster.create({
			title: "Success",
			description: `${data.email} has successfully subscribed to our newsletter.`,
			type: "success",
		});
		reset(); // Clear the form after successful submission
	};

	return (
		<>
			<Toaster />
			<Box
				as="footer"
				py={{ base: 6, md: 7 }}
				backgroundColor="#573E33"
				color="white"
				px={{ base: 3, md: 5 }}>
				<Heading as="h3" size={{ base: "xl", md: "xl" }} mb={4} textAlign="center">
					Subscribe to our newsletter
				</Heading>
				<Box display="flex" justifyContent="center" width="100%">
					<InputGroup maxWidth={{ base: "90%", sm: "400px" }} mx="auto">
						<form
							onSubmit={handleSubmit(Subscribe)}
							style={{ width: "100%", textAlign: "center" }}>
							<Flex width="100%" justifyContent="center">
								<HStack
									gap={1}
									align="center"
									border="1px solid white"
									borderRadius={0}
									borderLeftRadius={22}
									width={inputWidth}
									bg="transparent">
									<Box paddingLeft={3} display="flex" alignItems="center">
										<LuMail color="white" />
									</Box>

									<Field.Root required width="100%">
										<Input
											type="email"
											placeholder="Your email address"
											variant="flushed"
											color="white"
											_placeholder={{ color: "white", opacity: 0.8 }}
											_focus={{ outline: "none", borderColor: "white" }}
											shadow="none"
											_hover={{ borderColor: "white" }}
											border="0px solid white"
											bg="transparent"
											width="100%"
											padding={2}
											fontSize="sm"
											textAlign="center"
											aria-label="Email subscription"
											{...register("email", {
												required: "Email is required",
												pattern: {
													value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
													message: "Invalid email address",
												},
											})}
										/>
										<Field.ErrorText color="red.300" textAlign="center">
											{errors.email && errors.email.message}
										</Field.ErrorText>
									</Field.Root>
								</HStack>
								<Button
									type="submit"
									bg="#9B6A50"
									borderLeftRadius={0}
									borderRightRadius={22}
									border="1px solid white"
									padding={5}
									_hover={{ bg: "#7A5640", borderColor: "white" }}
									paddingX={4}
									fontSize="xl"
									aria-label="Subscribe">
									➝
								</Button>
							</Flex>
						</form>
					</InputGroup>
				</Box>
				<Box
					borderTop="1px solid white"
					mt={6}
					pt={2}
					pb={0}
					px={3}
					mx="auto"
					mb={0}
					maxHeight={{ base: "100px", md: "10" }}>
					<HStack
						justify="space-between"
						align="center"
						fontSize="xs"
						opacity={0.8}
						flexDirection={{ base: "column", md: "row" }}
						gap={{ base: 2, md: 0 }}>
						<Text textAlign="center">
							&copy; 2024 Brand, Inc. • <a href="#">Privacy</a> • <a href="#">Terms</a>{" "}
							• <a href="#">Sitemap</a>
						</Text>
						<HStack gap={2}>
							<Link href="#" aria-label="Facebook">
								<IconButton
									aria-label="Facebook"
									as={FaFacebook}
									bg="transparent"
									_hover={{ color: "#1877F2" }}
									size="sm"
								/>
							</Link>
							<Link href="#" aria-label="Twitter">
								<IconButton
									aria-label="Twitter"
									as={FaXTwitter}
									bg="transparent"
									_hover={{ color: "#000" }}
									size="sm"
								/>
							</Link>
						</HStack>
					</HStack>
				</Box>
			</Box>
		</>
	);
};

export default Footer;
