import React, { useState, useEffect } from "react";
import { IconButton, Box, Text, useDisclosure, Center } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { getCartItemCount } from "../../../utils/func/cartUtils";
import CartDrawer from "./CartDrawer";

interface CartIconProps {
	color?: string;
}

export default function CartIcon({ color = "white" }: CartIconProps) {
	const { open, onOpen, onClose } = useDisclosure();
	const [itemCount, setItemCount] = useState(0);

	// Update cart count whenever the component is mounted or the drawer closes
	// This ensures the count is always up to date
	useEffect(() => {
		const updateCartCount = () => {
			setItemCount(getCartItemCount());
		};

		// Update when component mounts
		updateCartCount();

		// Set up interval to check cart count periodically
		const intervalId = setInterval(updateCartCount, 2000);

		// Clean up interval on unmount
		return () => clearInterval(intervalId);
	}, []);

	// Also update when the drawer closes
	const handleCloseDrawer = () => {
		onClose();
		setItemCount(getCartItemCount());
	};

	return (
		<>
			<Box position="relative" display="inline-block">
				<IconButton
					aria-label="Shopping cart"
					variant="ghost"
					color={color}
					bg="transparent"
					onClick={onOpen}
					_hover={{ bg: "whiteAlpha.200" }}>
					<FiShoppingCart size={20} />
				</IconButton>

				{itemCount > 0 && (
					<Box
						position="absolute"
						top={0}
						right={0}
						bg="#A47864"
						opacity={0.85}
						color="white"
						fontWeight="bold"
						minWidth="30px"
						height="18px"
						borderRadius="15px"
						transform="translate(25%, -25%)">
						<Center h="100%">
							<Text fontSize="xs">{itemCount}</Text>
						</Center>
					</Box>
				)}
			</Box>

			<CartDrawer isOpen={open} onClose={handleCloseDrawer} />
		</>
	);
}
