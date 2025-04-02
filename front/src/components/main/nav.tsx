import React from "react";
import {
	Box,
	Flex,
	Text,
	IconButton,
	Stack,
	Link,
	Button,
	useDisclosure,
} from "@chakra-ui/react";
import { Collapse } from "@chakra-ui/transition";
import { FaBars, FaTimes } from "react-icons/fa";

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
		label: "Features",
		href: "/features",
	},
	{
		label: "Pricing",
		href: "/pricing",
	},
	{
		label: "About",
		href: "/about",
	},
];

export default function Navbar() {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Box
			as="header"
			position="sticky"
			top="0"
			zIndex={1000}
			width="100%"
			className="shadow-md"
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
				className="transition-all duration-200">
				<Flex
					flex={{ base: 1, md: "auto" }}
					ml={{ base: -2 }}
					display={{ base: "flex", md: "none" }}>
					<IconButton
						onClick={onToggle}
						variant={"ghost"}
						aria-label={"Toggle Navigation"}
						className="focus:outline-none">
						{isOpen ? <FaTimes size={16} /> : <FaBars size={20} />}
					</IconButton>
				</Flex>
				<Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
					<Text
						textAlign={{ base: "center", md: "left" }}
						fontWeight="bold"
						fontSize="xl"
						className="text-blue-600 hover:text-blue-700">
						Logo
					</Text>

					<Flex display={{ base: "none", md: "flex" }} ml={10}>
						<Stack direction={"row"} gap={4} align={"center"}>
							{NAV_ITEMS.map((navItem) => (
								<Link
									key={navItem.label}
									p={3}
									href={navItem.href}
									fontSize={"sm"}
									fontWeight={600}
									color={"#a47864"}
									_hover={{ color: "#604538", textDecoration: "none" }}
									className="transition-colors duration-200">
									{navItem.label}
								</Link>
							))}
						</Stack>
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify={"flex-end"}
					direction={"row"}
					gap={6}>
					<Link href={"#"} textDecoration="none">
						<Button
							fontSize={"sm"}
							fontWeight={400}
							variant={"ghost"}
							className="text-gray-600 hover:text-gray-800">
							Sign In
						</Button>
					</Link>
					<Link href={"#"} textDecoration="none">
						<Button
							display={{ base: "none", md: "inline-flex" }}
							fontSize={"sm"}
							fontWeight={600}
							color={"white"}
							bg={"blue.400"}
							_hover={{
								bg: "blue.500",
							}}
							className="shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
							Sign Up
						</Button>
					</Link>
				</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<Stack bg="white" p={4} display={{ md: "none" }} className="shadow-inner">
					{NAV_ITEMS.map((navItem) => (
						<Stack key={navItem.label} gap={4}>
							<Link
								py={2}
								href={navItem.href}
								color={"#a47864"}
								_hover={{ color: "#604538", bg: "gray.50" }}
								className="px-3 py-2 rounded-md transition-colors duration-200">
								{navItem.label}
							</Link>
						</Stack>
					))}
				</Stack>
			</Collapse>
		</Box>
	);
}
