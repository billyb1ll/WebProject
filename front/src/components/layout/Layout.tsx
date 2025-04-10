import React from "react";
import Navbar from "./nav";
import Footer from "./footer";
import { Box } from "@chakra-ui/react";

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<Box
			as="div"
			aria-label="Layout"
			id="layout-root"
			display="flex"
			flexDirection="column"
			minHeight="100vh">
			<Navbar />
			<Box as="main" flex="1" aria-label="Main Content">
				{children}
			</Box>
			<Footer />
		</Box>
	);
}
