import React from "react";
import {
	Box,
	Flex,
	Text,
	IconButton,
	Stack,
	Button,
	useDisclosure,
	HStack,
	Menu,
	Avatar,
	Badge,
} from "@chakra-ui/react";
import { Collapse } from "@chakra-ui/transition";
import { FaBars, FaTimes } from "react-icons/fa";
import { LuUser, LuLogOut } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { COLORS } from "../../constants/colors";
import { ROUTES } from "../../constants/routes";
import { motion } from "framer-motion";
import CartIcon from "../features/cart/CartIcon";
import { useAuth } from "@/contexts/AuthContext";

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
	const { isOpen: open, onToggle } = useDisclosure();
	const { user, isAuthenticated, logout } = useAuth();

	// Check if user is an admin
	const isAdmin = user?.role === "admin";

	// Get user's initials for avatar fallback
	const getUserInitials = () => {
		if (!user) return "U";

		const firstInitial = user.firstName ? user.firstName.charAt(0) : "";
		const lastInitial = user.lastName ? user.lastName.charAt(0) : "";

		return (
			(firstInitial + lastInitial).toUpperCase() ||
			user.email.charAt(0).toUpperCase()
		);
	};

	// Handle user logout
	const handleLogout = () => {
		logout();
	};

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
					{/* Admin Badge - Only shown for admin users */}
					{isAuthenticated && isAdmin && (
						<Badge
							colorScheme="purple"
							alignSelf="center"
							px={2}
							py={1}
							borderRadius="md"
							display={{ base: "none", md: "flex" }}>
							Welcome Admin
						</Badge>
					)}
					{/* Cart Icon */}
					<HStack mr={{ base: 0, md: 2 }}>
						<CartIcon color={COLORS.BRAND_PRIMARY} />
					</HStack>

					{isAuthenticated ? (
						// Show user avatar and menu when logged in
						<Menu.Root closeOnSelect>
							<Menu.Trigger asChild>
								<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
									<Avatar.Root
										size="sm"
										bg={COLORS.BRAND_PRIMARY}
										color="white"
										cursor="pointer"
										_hover={{ boxShadow: "md" }}>
										<Avatar.Fallback
											name={getUserInitials()}
											bg={COLORS.BRAND_PRIMARY}
											color="white"
											fontSize="0.875rem"
											fontWeight="bold"
											borderRadius="full"
											width="100%"
											height="100%"
											display="flex"
											justifyContent="center"
											alignItems="center">
											{getUserInitials()}
										</Avatar.Fallback>
										<Avatar.Image
											src={user?.avatar || ""}
											alt="User Avatar"
											borderRadius="full"
											width="100%"
											height="100%"
											display="flex"
											justifyContent="center"
											alignItems="center"
											loading="lazy"
											style={{
												objectFit: "cover",
												borderRadius: "50%",
											}}
										/>
									</Avatar.Root>
								</motion.div>
							</Menu.Trigger>
							<Menu.Positioner>
								<Menu.Content minW="180px">
									<Menu.ItemGroup>
										{isAdmin && (
											<Menu.Item value="admin" color="purple.500">
												<Box as="span" fontWeight="bold">
													Admin
												</Box>
											</Menu.Item>
										)}
										<Menu.Item value="profile">
											<LuUser size={16} />
											{user?.firstName || "Profile"}
										</Menu.Item>
										<Menu.Item onClick={handleLogout} color="red.500" value="sign-out">
											<LuLogOut size={16} />
											Sign Out
										</Menu.Item>
									</Menu.ItemGroup>
								</Menu.Content>
							</Menu.Positioner>
						</Menu.Root>
					) : (
						// Show login/signup buttons when not logged in
						<>
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
						</>
					)}
				</MotionStack>
			</MotionFlex>

			<Collapse in={open} animateOpacity>
				<Stack bg="white" p={4} display={{ md: "none" }} boxShadow="md" gap={3}>
					<Box borderBottom="1px" borderColor="gray.100" w="100%" />

					{/* Cart in mobile menu */}
					<Box py={2} px={1}>
						<Flex align="center" justify="space-between">
							<Text color={COLORS.INACTIVE} fontWeight="500">
								Your Cart
							</Text>
							<CartIcon color={COLORS.BRAND_PRIMARY} />
						</Flex>
					</Box>
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

					{/* Conditional rendering for mobile auth buttons */}
					{isAuthenticated ? (
						<>
							<Box borderBottom="1px" borderColor="gray.100" w="100%" />

							<Flex align="center" py={2} px={1} justify="space-between">
								<Text fontWeight="500" color={COLORS.BRAND_PRIMARY}>
									{isAdmin ? "Welcome Admin" : user?.firstName || "Welcome!"}
								</Text>
								<Avatar.Root size="sm">
									<Avatar.Fallback
										name={getUserInitials()}
										bg={COLORS.BRAND_PRIMARY}
										color="white"
										fontSize="0.875rem"
										fontWeight="bold"
										borderRadius="full"
										width="100%"
										height="100%"
										display="flex"
										justifyContent="center"
										alignItems="center">
										{getUserInitials()}
									</Avatar.Fallback>
									<Avatar.Image
										src={user?.avatar || ""}
										alt="User Avatar"
										borderRadius="full"
										width="100%"
										height="100%"
										display="flex"
										justifyContent="center"
										alignItems="center"
										loading="lazy"
										style={{
											objectFit: "cover",
											borderRadius: "50%",
										}}
									/>
								</Avatar.Root>
							</Flex>

							<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
								<Box
									as="button"
									onClick={handleLogout}
									fontSize="0.875rem"
									fontWeight={600}
									color="white"
									bg="red.500"
									py={2}
									borderRadius="0.375rem"
									width="100%"
									transition="background-color 0.2s"
									_hover={{ bg: "red.600" }}>
									Sign Out
								</Box>
							</motion.div>
						</>
					) : (
						<>
							<Box mt={2} width="full" textAlign="center">
								<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
									<NavLink
										to={ROUTES.LOGIN}
										onClick={onToggle}
										style={{
											display: "block",
											fontSize: "0.875rem",
											fontWeight: 400,
											color: COLORS.BRAND_PRIMARY,
											backgroundColor: "white",
											padding: "0.625rem 0",
											borderRadius: "0.375rem",
											width: "100%",
											transition: "all 0.2s",
											border: `1px solid ${COLORS.BRAND_PRIMARY}`,
											marginBottom: "10px",
										}}
										className="mobile-sign-in">
										Sign In
									</NavLink>
								</motion.div>
							</Box>

							<Box width="full" textAlign="center">
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
						</>
					)}
				</Stack>
			</Collapse>
		</Box>
	);
}
