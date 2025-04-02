import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button, HStack, Avatar } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/main/nav";

function App() {

	return (
		<>
			<Navbar />
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height="100vh"
				backgroundColor="gray.100"
				padding="20px"
				className="transition-all duration-200">
				<div>
					<a href="https://vitejs.dev" target="_blank">
						<img src={viteLogo} className="logo" alt="Vite logo" />
					</a>
				</div>
				
				</Box>
		</>
	);
}

export default App;