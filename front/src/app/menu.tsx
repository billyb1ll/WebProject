import { Box, Flex, Link } from "@chakra-ui/react";

export default function Navbar() {
	return (
		<Box
			bg="white"
			p={4}
			boxShadow="md"
			position="fixed"
			width="100%"
			zIndex="10">
			<Flex justify="space-between" align="center" maxW="container.lg" mx="auto">
				<Flex align="center" gap={4}>
					<Link href="/" fontSize="xl" fontWeight="bold" color="blue.600">
						Google
					</Link>
				</Flex>
				<Flex align="center" gap={4}>
					<Link href="/about" _hover={{ color: "gray.600" }}>
						About
					</Link>
					<Link href="/store" _hover={{ color: "gray.600" }}>
						Store
					</Link>
					<Link href="/gmail" _hover={{ color: "gray.600" }}>
						Gmail
					</Link>
					<Link href="/images" _hover={{ color: "gray.600" }}>
						Images
					</Link>
				</Flex>
			</Flex>
		</Box>
	);
}
