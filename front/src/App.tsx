import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button, HStack, Avatar } from "@chakra-ui/react";

function App() {
	const Demo = () => {
		return (
			<HStack>
				<Button>Click me</Button>
				<Button>Click me</Button>
				<Avatar.Root>
					<Avatar.Fallback name="Segun Adebayo" />
					<Avatar.Image src="https://bit.ly/sage-adebayo" />
				</Avatar.Root>
			</HStack>
		);
	};

	return Demo();
}

export default App;
