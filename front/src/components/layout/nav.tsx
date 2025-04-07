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
import { COLORS } from "../../constants/colors";
import { ROUTES } from "../../constants/routes";
import { motion } from "framer-motion";

interface NavItem {
	label: string;
	href: string;
}

const NAV_ITEMS: Array<NavItem> = [
	{
		label: "Home",
		href: ROUTES.HOME,
	},
	{
		label: "Products",
		href: ROUTES.PRODUCTS,
	},
	{
		label: "About",
		href: ROUTES.ABOUT,
	},
];

// Create a motion component with Flex
const MotionFlex = motion(Flex);
const MotionStack = motion(Stack);

export default function Navbar() {
	const { open, onToggle } = useDisclosure();

	return (
		<Box
			as="header"
			position="sticky"
			top="0"
			zIndex={1000}
			width="100%"
			boxShadow="sm"
			bg="white">
			<MotionFlex
				initial={{ y: -10, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.4 }}
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
				justify="space-between">
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
						color={COLORS.BRAND_PRIMARY}
						_hover={{
							color: COLORS.BRAND_DARK,
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
					<NavLink to={ROUTES.HOME}>
						<motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
							<Text
								textAlign={{ base: "center", md: "left" }}
								fontWeight="bold"
								fontSize="xl"
								color={COLORS.BRAND_PRIMARY}
								_hover={{ color: COLORS.BRAND_DARK }}>
								Logo
							</Text>
						</motion.div>
					</NavLink>

					<Flex display={{ base: "none", md: "flex" }} ml={10}>
						<MotionStack direction={"row"} gap={4} align={"center"}>
							{NAV_ITEMS.map((navItem, index) => (
								<motion.div
									key={navItem.label}
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1, duration: 0.3 }}
									whileHover={{ y: -2 }}>
									<NavLink
										to={navItem.href}
										className={({ isActive }) =>
											isActive ? "nav-active" : "nav-inactive"
										}
										style={({ isActive }) => ({
											color: isActive ? COLORS.BRAND_DARK : COLORS.INACTIVE,
											padding: "0.5rem 0.75rem",
											fontSize: "0.875rem",
											fontWeight: isActive ? "600" : "400",
											transition: "color 0.2s",
										})}>
										{navItem.label}
									</NavLink>
								</motion.div>
							))}
						</MotionStack>
					</Flex>
				</Flex>

				<MotionStack
					flex={{ base: 1, md: 0 }}
					justify={"flex-end"}
					direction={"row"}
					gap={{ base: 2, md: 6 }}
					ml={{ base: 2, md: 0 }}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3, duration: 0.5 }}>
					<NavLink to={ROUTES.LOGIN}>
						<motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
							<Button
								fontSize={"sm"}
								width={{ base: "auto", md: "10rem" }}
								minW={{ base: "5rem", md: "8rem" }}
								py={2}
								fontWeight={400}
								variant={"outline"}
								borderColor={COLORS.BRAND_PRIMARY}
								color={COLORS.BRAND_PRIMARY}
								bg={"white"}
								rounded={"10px"}
								_hover={{
									bg: "gray.50",
									color: COLORS.BRAND_DARK,
									borderColor: COLORS.BRAND_DARK,
								}}
								boxShadow="md">
								Sign In
							</Button>
						</motion.div>
					</NavLink>
					<NavLink to={ROUTES.SIGNUP}>
						<motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
							<Button
								display={{ base: "none", md: "inline-flex" }}
								width={{ base: "auto", md: "10rem" }}
								minW={{ md: "8rem" }}
								py={2}
								rounded={"10px"}
								fontSize={"sm"}
								fontWeight={600}
								color={"white"}
								bg={COLORS.BRAND_PRIMARY}
								_hover={{
									bg: COLORS.BRAND_DARK,
								}}
								boxShadow="md">
								Sign Up
							</Button>
						</motion.div>
					</NavLink>
				</MotionStack>
			</MotionFlex>

			<Collapse in={open} animateOpacity>
				<Stack bg="white" p={4} display={{ md: "none" }} boxShadow="md" gap={3}>
					<Box borderBottom="1px" borderColor="gray.100" w="100%" />
					{NAV_ITEMS.map((navItem, index) => (
						<motion.div
							key={navItem.label}
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.1, duration: 0.3 }}>
							<NavLink
								to={navItem.href}
								onClick={onToggle}
								className={({ isActive }) =>
									isActive ? "nav-mobile-active" : "nav-mobile-inactive"
								}
								style={({ isActive }) => ({
									padding: "0.75rem",
									borderRadius: "0.375rem",
									transition: "all 0.2s",
									color: isActive ? COLORS.BRAND_DARK : COLORS.INACTIVE,
									fontWeight: isActive ? "600" : "400",
									display: "block",
									background: isActive ? "rgba(164, 120, 100, 0.1)" : "transparent",
								})}>
								{navItem.label}
							</NavLink>
						</motion.div>
					))}
					<Box mt={2} width="full" textAlign="center">
						<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
							<NavLink
								to={ROUTES.SIGNUP}
								onClick={onToggle}
								style={{
									display: "block",
									fontSize: "0.875rem",
									fontWeight: 600,
									color: "white",
									backgroundColor: COLORS.BRAND_PRIMARY,
									padding: "0.625rem 0",
									borderRadius: "0.375rem",
									width: "100%",
									transition: "background-color 0.2s",
								}}
								onMouseEnter={(e) =>
									(e.currentTarget.style.backgroundColor = COLORS.BRAND_DARK)
								}>
								Sign Up
							</NavLink>
						</motion.div>
					</Box>
				</Stack>
			</Collapse>
		</Box>
	);
}
