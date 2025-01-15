import { Box, Flex, Link, Text, Input, Button } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Toaster, toaster } from "@/components/ui/toaster"; // Import Toaster and toaster
import { useState } from "react";

export default function Navbar() {
	const [user, setUser] = useState({ name: "", avatar: "" });
	const [userId, setUserId] = useState("");

	const handleLogin = () => {
		fetch(`http://localhost:3005/users/${userId}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("User not found");
				}
				return response.json();
			})
			.then((data) =>
				setUser({
					name: data.name,
					avatar: `https://i.pravatar.cc/150?u=${data.id}`,
				})
			)
			.catch((error) => {
				console.error("Error fetching user:", error);
				toaster.error({
					title: "Error",
					description: "User not found. Please enter a valid user ID.",
				});
			});
	};

	const handleLogout = () => {
		setUser({ name: "", avatar: "" });
		setUserId("");
	};

	return (
		<>
			<Toaster />
			<Box
				bg="white"
				p={4}
				boxShadow="md"
				position="fixed"
				width="100%"
				zIndex="10">
				<Flex justify="space-between" align="center" maxW="container.lg" mx="auto">
					<Flex align="center" gap={4}>
						{user.name && (
							<>
								<Avatar name={user.name} src={user.avatar} />
								<Text fontSize="md" color="gray.600">
									Logged in as: {user.name}
								</Text>
							</>
						)}

						{!user.name && (
							<>
								<Text fontSize="md" color="gray.600">
									Login with:
								</Text>
								<Input
									id="userId"
									placeholder="Enter user ID"
									value={userId}
									onChange={(e) => setUserId(e.target.value)}
									width="150px"
								/>
								<Button onClick={handleLogin} colorScheme="blue">
									Login
								</Button>
							</>
						)}
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
						{user.name && (
							<Button onClick={handleLogout} colorScheme="red">
								Logout
							</Button>
						)}
					</Flex>
				</Flex>
			</Box>
		</>
	);
}
