"use client";

import { useEffect, useState } from "react";
import { Box, Flex, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { Alert } from "@/components/ui/alert";
import { CloseButton } from "@/components/ui/close-button";

import Navbar from "./menu";
import HomePage from "./homepage";
import InputForm from "./inputForm";
import MessageDisplay from "./messageDisplay";

export default function Home() {
	const [message, setMessage] = useState("");
	const [input, setInput] = useState("");
	const [showAlert, setShowAlert] = useState(false);

	useEffect(() => {
		fetch(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005")
			.then((response) => response.text())
			.then((data) => setMessage(data))
			.catch((error) => console.error("Error fetching data:", error));
	}, []);

	const handleSubmit = () => {
		if (input.trim() === "") {
			setShowAlert(true);
			return;
		}

		fetch(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005", {
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
		<>
			<Box
				bg="white"
				minH="100vh"
				display="flex"
				flexDirection="column"
				alignItems="center">
				<Navbar />
				<MainContent
					input={input}
					setInput={setInput}
					showAlert={showAlert}
					setShowAlert={setShowAlert}
					handleSubmit={handleSubmit}
					message={message}
				/>
			</Box>
		</>
	);
}

function MainContent({
	input,
	setInput,
	showAlert,
	setShowAlert,
	handleSubmit,
	message,
}: {
	input: string;
	setInput: React.Dispatch<React.SetStateAction<string>>;
	showAlert: boolean;
	setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
	handleSubmit: () => void;
	message: string;
}) {
	return (
		<Flex
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			flexGrow="1"
			maxW="container.md"
			mx="auto"
			pt="24">
			{/* HomePage content */}
			<Box mb="8">
				<HomePage />
			</Box>
			{/* Input form */}
			<InputForm
				input={input}
				setInput={setInput}
				handleSubmit={handleSubmit}
				showAlert={showAlert}
				setShowAlert={setShowAlert}
			/>
			{/* Display the fetched message */}
			<MessageDisplay message={message} />
			{/* Alert for empty input */}
			{showAlert && (
				<Alert status="error" mt="4">
					<AlertTitle mr={2}>Invalid Fields</AlertTitle>
					<AlertDescription>Input cannot be empty.</AlertDescription>
					<CloseButton
						position="absolute"
						right="8px"
						top="8px"
						onClick={() => setShowAlert(false)}
					/>
				</Alert>
			)}
		</Flex>
	);
}
