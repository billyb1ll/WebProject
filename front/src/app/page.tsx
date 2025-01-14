"use client";

import { useEffect, useState } from "react";
import {
	Box,
	Button,
	Flex,
	Input,
	Image,
	Text,
	useBreakpointValue,
} from "@chakra-ui/react";
import Navbar from "./menu";

export default function Home() {
	const [message, setMessage] = useState("");
	const [input, setInput] = useState("");

	useEffect(() => {
		fetch("http://localhost:3005")
			.then((response) => response.text())
			.then((data) => setMessage(data))
			.catch((error) => console.error("Error fetching data:", error));
	}, []);

	const handleSubmit = () => {
		fetch("http://localhost:3005", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ input }),
		})
			.then((response) => response.text())
			.then((data) => setMessage(data))
			.catch((error) => console.error("Error sending data:", error));
	};

	return (
		<Box
			bg="white"
			minH="100vh"
			display="flex"
			flexDirection="column"
			alignItems="center">
			<Navbar />
			<Flex
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				flexGrow="1"
				maxW="container.md"
				mx="auto"
				pt="24">
				<Image src="/google-logo.png" alt="Google Logo" width="192px" mb="8" />

				{/* Input field and button */}
				<Flex
					flexDirection={useBreakpointValue({ base: "column", sm: "row" })}
					gap="5"
					alignItems="center"
					width="full"
					px="4">
					<Input
						type="text"
						id="inputMSG"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						borderRadius="full"
						px="5"
						py="3"
						borderColor="blue.600"
						width={useBreakpointValue({ base: "full", sm: "auto" })}
						placeholder="Search Google or type a URL"
					/>
					<Button
						id="sendMSG"
						bg="blue.500"
						color="white"
						borderRadius="full"
						px="5"
						py="3"
						_hover={{ bg: "blue.800" }}
						onClick={() => {
							if (input.trim() !== "") {
								handleSubmit();
							} else {
								alert("Input cannot be empty");
							}
						}}>
						Search
					</Button>
				</Flex>
				{/* Display the fetched message */}
				<Box textAlign="center" mt="8" width="full" px="4">
					<Text>{message}</Text>
				</Box>
			</Flex>
		</Box>
	);
}
