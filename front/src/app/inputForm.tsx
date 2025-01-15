import {
	Box,
	Flex,
	Input,
	defineStyle,
	Field,
	useBreakpointValue,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react"; // Import useState

const floatingStyles = defineStyle({
	pos: "absolute",
	bg: "bg",
	px: "0.5",
	top: "-3",
	insetStart: "2",
	fontWeight: "normal",
	pointerEvents: "none",
	transition: "position",
	_peerPlaceholderShown: {
		color: "fg.muted",
		top: "2.5",
		insetStart: "3",
	},
	_peerFocusVisible: {
		color: "fg",
		top: "-3",
		insetStart: "2",
		animation: "ease-in-out 0.1s",
	},
	_peerHover: {
		color: "fg",
		top: "-3",
		insetStart: "2",
		animation: "ease-in-out 0.1s",
	},
});

interface InputFormProps {
	input: string;
	setInput: React.Dispatch<React.SetStateAction<string>>;
	showAlert: boolean;
	setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
	handleSubmit: () => void;
}

export default function InputForm({
	input,
	setInput,
	showAlert,
	setShowAlert,
	handleSubmit,
}: InputFormProps) {
	const [userName, setUserName] = useState(""); // Separate state for user name

	useEffect(() => {
		fetch("http://localhost:3005/users/1")
			.then((response) => response.json())
			.then((data) => setUserName(data.name)) // Set user name
			.catch((error) => console.error("Error fetching user:", error));
	}, []);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			if (input.trim() === "") {
				setShowAlert(true);
				toaster.error({
					title: "Cannot send an empty message",
					description: "Try Again",
				});
			} else {
				handleSubmit();
				toaster.success({
					title: "Message Sent",
					description: `Your message "${input}" has been sent successfully`,
				});
				setShowAlert(false);
			}
		}
	};

	const handleClick = () => {
		if (input.trim() === "") {
			setShowAlert(true);
			toaster.error({
				title: "Cannot send an empty message",
				description: "Try Again",
				action: {
					label: "Undo",
					onClick: () => console.log("Undo"),
				},
			});
		} else {
			setShowAlert(false);
			handleSubmit();
			toaster.success({
				title: "Message Sent",
				description: `Your message "${input}" has been sent successfully`,
			});
		}
	};

	return (
		<>
			<Toaster />
			<Flex
				flexDirection={useBreakpointValue({ base: "column", sm: "row" })}
				gap="5"
				alignItems="center"
				width="full"
				px="4">
				<Field.Root invalid={showAlert}>
					<Box pos="relative" w="full">
						<Input
							type="text"
							id="inputMSG"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							borderRadius="full"
							className="peer"
							px="5"
							py="3"
							onKeyDown={handleKeyDown}
							width={useBreakpointValue({ base: "full", sm: "auto" })}
							placeholder="Type a message that you want to send..."
							_placeholder={{ color: "transparent" }}
							border="1px solid"
							borderColor="gray.200"
							_hover={{ borderColor: "gray.100", _placeholder: { color: "fg.muted" } }}
							_focus={{ _placeholder: { color: "fg" } }}
						/>
						<Field.Label css={floatingStyles}>Message</Field.Label>
					</Box>
				</Field.Root>
				<Button
					id="sendMSG"
					bg="blue.500"
					color="white"
					borderRadius="full"
					px="5"
					py="3"
					onClick={handleClick}>
					Send
				</Button>
			</Flex>
		</>
	);
}
