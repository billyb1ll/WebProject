import React from "react";
import {
	Box,
	Flex,
	Text,
	IconButton,
	Stack,
	Button,
	useDisclosure,
} from "@chakra-ui/react";
import { Collapse } from "@chakra-ui/transition";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

interface NavItem {
	label: string;
	href: string;
}

const NAV_ITEMS: Array<NavItem> = [
	{
		label: "Home",
		href: "/",
	},
	{
		label: "Products",
		href: "/products",
	},
	{
		label: "About",
		href: "/about",
	},
];

// Define brand colors
const BRAND_COLOR = "#A47864";
const BRAND_COLOR_DARK = "#604538";
const INACTIVE_COLOR = "#989898";

export default function Navbar() {
	const { open, onToggle } = useDisclosure();

	return (
		<Box
			as="header"
			position="fixed"
			top="0"
			zIndex={1000}
			width="100%"
			boxShadow="sm"
			bg="white">
			<Flex
				bg="white"
				color="gray.600"
				minH={"60px"}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={"solid"}
				borderColor="gray.200"
				align={"center"}
				width="100%"
				maxW="container.2xl"
				mx="auto"
				justify="space-between"
				transition="all 0.2s">
				<Flex
					flex={{ base: "1", md: "auto" }}
					ml={{ base: -2 }}
					display={{ base: "flex", md: "none" }}
					alignItems="center">
					<IconButton
						onClick={onToggle}
						as={open ? FaTimes : FaBars}
						variant={"ghost"}
						aria-label={"Toggle Navigation"}
						color={BRAND_COLOR}
						_hover={{
							color: BRAND_COLOR_DARK,
							bg: "gray.100",
						}}
						fontSize="1.25rem"
						boxSize={open ? 4 : 5}
					/>
				</Flex>
				<Flex
					flex={{ base: 1 }}
					justify={{ base: "center", md: "start" }}
					alignItems="center">
					<NavLink to="/">
						<Text
							textAlign={{ base: "center", md: "left" }}
							fontWeight="bold"
							fontSize="xl"
							color={BRAND_COLOR}
							_hover={{ color: BRAND_COLOR_DARK }}>
							Logo
						</Text>
					</NavLink>

					<Flex display={{ base: "none", md: "flex" }} ml={10}>
						<Stack direction={"row"} gap={4} align={"center"}>
							{NAV_ITEMS.map((navItem) => (
								<NavLink
									key={navItem.label}
									to={navItem.href}
									className={({ isActive }) =>
										isActive ? "nav-active" : "nav-inactive"
									}
									style={({ isActive }) => ({
										color: isActive ? BRAND_COLOR_DARK : INACTIVE_COLOR,
										padding: "0.5rem 0.75rem",
										fontSize: "0.875rem",
										fontWeight: isActive ? "600" : "400",
										transition: "color 0.2s",
									})}>
									{navItem.label}
								</NavLink>
							))}
						</Stack>
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify={"flex-end"}
					direction={"row"}
					gap={{ base: 2, md: 6 }}
					ml={{ base: 2, md: 0 }}>
					<NavLink to="/login">
						<Button
							fontSize={"sm"}
							width={{ base: "auto", md: "10rem" }}
							minW={{ base: "5rem", md: "8rem" }}
							py={2}
							fontWeight={400}
							variant={"outline"}
							borderColor={BRAND_COLOR}
							color={BRAND_COLOR}
							bg={"white"}
							rounded={"10px"}
							_hover={{
								bg: "gray.50",
								color: BRAND_COLOR_DARK,
								borderColor: BRAND_COLOR_DARK,
							}}
							boxShadow="md"
							_active={{ transform: "scale(0.98)" }}>
							Sign In
						</Button>
					</NavLink>
					<NavLink to="/signup">
						<Button
							display={{ base: "none", md: "inline-flex" }}
							width={{ base: "auto", md: "10rem" }}
							minW={{ md: "8rem" }}
							py={2}
							rounded={"10px"}
							fontSize={"sm"}
							fontWeight={600}
							color={"white"}
							bg={BRAND_COLOR}
							_hover={{
								bg: BRAND_COLOR_DARK,
							}}
							boxShadow="md"
							_active={{ transform: "scale(0.98)" }}>
							Sign Up
						</Button>
					</NavLink>
				</Stack>
			</Flex>

			<Collapse in={open} animateOpacity>
				<Stack bg="white" p={4} display={{ md: "none" }} boxShadow="md" gap={3}>
					<Box borderBottom="1px" borderColor="gray.100" w="100%" />
					{NAV_ITEMS.map((navItem) => (
						<NavLink
							key={navItem.label}
							to={navItem.href}
							onClick={onToggle}
							className={({ isActive }) =>
								isActive ? "nav-mobile-active" : "nav-mobile-inactive"
							}
							style={({ isActive }) => ({
								padding: "0.75rem",
								borderRadius: "0.375rem",
								transition: "all 0.2s",
								color: isActive ? BRAND_COLOR_DARK : INACTIVE_COLOR,
								fontWeight: isActive ? "600" : "400",
								display: "block",
								background: isActive ? "rgba(164, 120, 100, 0.1)" : "transparent",
							})}>
							{navItem.label}
						</NavLink>
					))}
					<Box mt={2} width="full" textAlign="center">
						<NavLink
							to="/signup"
							onClick={onToggle}
							style={{
								display: "block",
								fontSize: "0.875rem",
								fontWeight: 600,
								color: "white",
								backgroundColor: BRAND_COLOR,
								padding: "0.625rem 0",
								borderRadius: "0.375rem",
								width: "100%",
								transition: "background-color 0.2s",
							}}
							onMouseEnter={(e) =>
								(e.currentTarget.style.backgroundColor = BRAND_COLOR_DARK)
							}>
							Sign Up
						</NavLink>
					</Box>
				</Stack>
			</Collapse>
		</Box>
	);
}
