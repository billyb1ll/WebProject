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
	Group,
} from "@chakra-ui/react";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useForm } from "react-hook-form";

const Footer = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ email: string }>();

	const Subscribe = (email: string): void => {
		// Handle the subscription logic here
		if (!email) {
			toaster.create({
				title: "Error",
				description: "Please enter a valid email address.",
				type: "error",
			});
			return;
		}
		// Simulate a successful subscription
		console.log("Email subscribed:", email);
		toaster.create({
			title: "Success",
			description: `${email} have successfully subscribed to our newsletter.`,
			type: "success",
		});
	};

	return (
		<>
			<Toaster />
			<Box as="footer" className="bg-[#573E33] text-white " py={10} px={5}>
				<Heading as="h3" size="2xl" mb={4} textAlign="center">
					Subscribe to our newsletter
				</Heading>
				<Box display="flex" justifyContent="center" width="100%">
					<InputGroup maxWidth="400px" mx="auto">
						<HStack
							as="form"
							justify="center"
							gap={0}
							width="100%"
							onSubmit={handleSubmit((data) => Subscribe(data.email))}>
							<Group attached>
								<HStack
									gap={1}
									align="center"
									border="1px solid white"
									borderRadius={0}
									borderLeftRadius={22}
									width="70%">
									<Box paddingLeft={3} display="flex" alignItems="center">
										<LuMail color="white" />
									</Box>

									<Field.Root required width="100%">
										<Input
											type="email"
											placeholder="Input your email"
											variant="flushed"
											color="white"
											_placeholder={{ color: "white" }}
											_focus={{ outline: "none" }}
											shadow={"none"}
											_hover={{ borderColor: "white" }}
											border="0px solid white"
											bg="transparent"
											width="100%"
											padding={2}
											fontSize="sm"
											textAlign="left"
											{...register("email", { required: true })}
										/>
										<Field.ErrorText>
											{errors.email && <span>This field is required</span>}
										</Field.ErrorText>
									</Field.Root>
								</HStack>
								<Button
									type="submit"
									bg="#9B6A50"
									borderLeftRadius={0}
									borderRightRadius={22}
									border={"1px solid white"}
									padding={5}
									_hover={{ bg: "#7A5640", borderColor: "white" }}
									paddingX={4}
									fontSize={"xl"}>
									➝
								</Button>
							</Group>
						</HStack>
					</InputGroup>
				</Box>
				<Box borderTop="2px solid white" mt={6} pt={2} pb={0}>
					<HStack justify="space-between" align="center" fontSize="sm" opacity={0.8}>
						<Text>
							&copy; 2024 Brand, Inc. • <a href="#">Privacy</a> • <a href="#">Terms</a>{" "}
							• <a href="#">Sitemap</a>
						</Text>
						<HStack gap={3}>
							<Link href="#">
								<IconButton
									aria-label="Facebook"
									as={FaFacebook}
									bg="transparent"
									_hover={{ color: "#1877F2" }}
								/>
							</Link>
							<Link href="#">
								<IconButton
									aria-label="Twitter"
									as={FaXTwitter}
									bg="transparent"
									_hover={{ color: "#000" }}
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
