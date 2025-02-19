import {
	Box,
	Flex,
	Input,
	defineStyle,
	Field,
	useBreakpointValue,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";

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
	},
	_peerHover: {
		color: "fg",
		top: "-3",
		insetStart: "2",
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
	const [userName, setUserName] = useState("");
	const [counter, setCounter] = useState(1);

	useEffect(() => {
		fetch("http://localhost:3005/users/1")
			.then((response) => response.json())
			.then((data) => setUserName(data.name))
			.catch((error) => console.error("Error fetching user:", error));
	}, []);

	const incrementCounter = () => setCounter((prev) => prev + 1);

	const showToast = (
		type: "success" | "error",
		title: string,
		description: string
	) => {
		toaster.create({ title, description, type });
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			if (input.trim() === "") {
				setShowAlert(true);
				showToast("error", "Cannot send an empty message", "Try Again");
			} else {
				handleSubmit();
				setShowAlert(false);
				showToast(
					"success",
					"Message Sent",
					`Your message "${input}" has been sent successfully counter: ${counter}`
				);
			}
		}
	};

	const handleClick = () => {
		if (input.trim() === "") {
			setShowAlert(true);
			showToast("error", "Cannot send an empty message", "Try Again");
		} else {
			setShowAlert(false);
			handleSubmit();
			incrementCounter();
			showToast(
				"success",
				"Message Sent",
				`Your message "${input}" has been sent successfully counter: ${counter}`
			);
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
						{/* <Input
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
							_focus={{ _placeholder: { color: "fg.muted" } }}
						/>
						<Field.Label css={floatingStyles}>Message</Field.Label> */}
						<form className="flex bg-zinc-800 border border-zinc-700 rounded-md shadow text-white text-sm">
							<div
								aria-disabled="true"
								className="text-white w-10 grid place-content-center text-zinc-400">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width={16}
									height={16}
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round">
									<circle cx={11} cy={11} r={8} />
									<path d="m21 21-4.3-4.3" />
								</svg>
							</div>
							<input
								type="text"
								id="inputMSG"
								value={input}
								onChange={(e) => setInpt(e.target.value)}
								spellCheck="false"
								name="text"
								className="bg-transparent py-1.5 outline-none placeholder:text-zinc-400 w-20 focus:w-48 transition-all"
								placeholder="Type a message that you want to send..."
							/>
							<button
								className="text-white w-10 grid place-content-center text-zinc-400"
								aria-label="Clear input button"
								type="reset"
								onClick={() => setInput("")}>
								<svg
									strokeLinejoin="round"
									strokeLinecap="round"
									strokeWidth={2}
									stroke="currentColor"
									fill="none"
									viewBox="0 0 24 24"
									height={16}
									width={16}
									xmlns="http://www.w3.org/2000/svg">
									<path d="M18 6 6 18" />
									<path d="m6 6 12 12" />
								</svg>
							</button>
						</form>
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
