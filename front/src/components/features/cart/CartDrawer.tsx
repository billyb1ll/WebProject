/**
 * CartDrawer Component
 * 
 * A slide-out drawer that displays the user's shopping cart contents.
 * Allows users to view, update quantities, and remove items from their cart.
 * Also provides options to proceed to checkout or clear the entire cart.
 */
import React,{useState} from "react";
import {
	Drawer,
	Button,
	ButtonGroup,
	Box,
	Text,
	VStack,
	HStack,
	Image,
	IconButton,
	Badge,
} from "@chakra-ui/react";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import {
	CartItem,
	removeFromCart,
	updateCartItemQuantity,
	getCart,
	clearCart,
	getFormattedCartTotal,
} from "../../../utils/func/cartUtils";
import { toaster } from "../../ui/toaster";
import { ROUTES } from "../../../constants/routes";
import { useNavigate } from "react-router-dom";

interface CartDrawerProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
	const navigate = useNavigate();
	// Local state to store cart items for the UI
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [cartTotal, setCartTotal] = useState<string>("$0.00");

	/**
	 * Load cart data when drawer opens
	 * This ensures we always display the most up-to-date cart information
	 */
	React.useEffect(() => {
		if (isOpen) {
			refreshCart();
		}
	}, [isOpen]);

	/**
	 * Updates the local cart state from cookies
	 * Call this function after any cart modifications
	 */
	const refreshCart = () => {
		const cart = getCart();
		setCartItems(cart.items);
		setCartTotal(getFormattedCartTotal());
	};

	/**
	 * Removes an item from the cart and refreshes the UI
	 * Shows a notification to confirm the action
	 * @param {string} itemId - ID of the item to remove
	 */
	const handleRemoveItem = (itemId: string) => {
		removeFromCart(itemId);
		refreshCart();
		toaster.create({
			title: "Item removed",
			description: "The item has been removed from your cart",
			type: "info",
			duration: 2000,
		});
	};

	/**
	 * Updates the quantity of an item and refreshes the UI
	 * @param {string} itemId - ID of the item to update
	 * @param {number} newQuantity - The new quantity value
	 */
	const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
		updateCartItemQuantity(itemId, newQuantity);
		refreshCart();
	};

	/**
	 * Clears all items from the cart
	 * Shows a notification to confirm the action
	 */
	const handleClearCart = () => {
		clearCart();
		refreshCart();
		toaster.create({
			title: "Cart cleared",
			description: "All items have been removed from your cart",
			type: "info",
			duration: 2000,
		});
	};

	/**
	 * Closes the drawer and navigates to checkout
	 */
	const handleCheckout = () => {
		onClose();
		navigate(ROUTES.CHECKOUT || "/checkout");
	};

	/**
	 * Formats the chocolate type for display
	 * Capitalizes the first letter
	 * @param {string} type - The chocolate type
	 * @returns {string} Formatted type name
	 */
	const getChocolateTypeName = (type: string): string => {
		return type.charAt(0).toUpperCase() + type.slice(1);
	};

	return (
		<Drawer.Root open={isOpen} onOpenChange={onClose} size="md" placement="end">
			<Drawer.Backdrop />
			<Drawer.Positioner>
				<Drawer.Content>
					{/* Close button and header */}
					<Drawer.CloseTrigger position="absolute" top="3" right="3" />
					<Drawer.Header borderBottomWidth="1px" bg="#F5F0E8" color="#604538">
						<Drawer.Title>
							Your Shopping Cart
							{cartItems.length > 0 && (
								<Badge ml={2} colorScheme="brown" fontSize="0.8em">
									{cartItems.length} items
								</Badge>
							)}
						</Drawer.Title>
					</Drawer.Header>

					{/* Cart items or empty cart message */}
					<Drawer.Body>
						{cartItems.length === 0 ? (
							// Empty cart message with continue shopping button
							<Box textAlign="center" py={10}>
								<Text color="gray.500">Your cart is empty</Text>
								<Button
									mt={4}
									colorScheme="brown"
									bg="#A47864"
									onClick={() => {
										onClose();
										navigate(ROUTES.PRODUCTS || "/products");
									}}>
									Continue Shopping
								</Button>
							</Box>
						) : (
							// List of cart items
							<VStack gap={4} align="stretch" py={4}>
								{cartItems.map((item) => (
									<Box
										key={item.id}
										p={3}
										borderWidth="1px"
										borderRadius="lg"
										borderColor="#E8DDD8">
										<HStack justifyContent="space-between">
											{/* Product image */}
											<Box width="60px" height="60px" bg="#F5F0E8" borderRadius="md">
												<Image
													src={`/images/chocolate-${item.config.chocolateType}.jpg`}
													alt={`${item.config.chocolateType} chocolate`}
													objectFit="cover"
													width="100%"
													height="100%"
													borderRadius="md"
												/>
											</Box>

											{/* Product details */}
											<VStack align="flex-start" flex={1} ml={3} gap={0}>
												<Text fontWeight="medium" color="#604538">
													{getChocolateTypeName(item.config.chocolateType)} Chocolate
												</Text>
												<Text fontSize="xs" color="gray.600">
													{item.config.shape} shape, {item.config.packaging} package
												</Text>
												{item.config.toppings.length > 0 && (
													<Text fontSize="xs" color="gray.600">
														Toppings: {item.config.toppings.join(", ")}
													</Text>
												)}
											</VStack>

											{/* Price and quantity controls */}
											<VStack align="flex-end" gap={1}>
												<Text fontWeight="medium" color="#604538">
													${item.price.toFixed(2)}
												</Text>

												<HStack>
													{/* Decrease quantity button */}
													<IconButton
														aria-label="Decrease quantity"
														size="xs"
														colorScheme="brown"
														variant="outline"
														disabled={item.quantity <= 1}
														onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
														<FiMinus size={14} />
													</IconButton>

													{/* Quantity display */}
													<Text fontSize="sm" width="20px" textAlign="center">
														{item.quantity}
													</Text>

													{/* Increase quantity button */}
													<IconButton
														aria-label="Increase quantity"
														size="xs"
														colorScheme="brown"
														variant="outline"
														onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
														<FiPlus size={14} />
													</IconButton>

													{/* Remove item button */}
													<IconButton
														aria-label="Remove item"
														size="xs"
														colorScheme="red"
														variant="ghost"
														onClick={() => handleRemoveItem(item.id)}>
														<FiTrash2 size={14} />
													</IconButton>
												</HStack>
											</VStack>
										</HStack>
									</Box>
								))}
							</VStack>
						)}
					</Drawer.Body>

					{/* Footer with totals and action buttons */}
					{cartItems.length > 0 && (
						<Drawer.Footer borderTopWidth="1px" flexDirection="column" gap={3}>
							{/* Cart total */}
							<HStack justify="space-between" width="100%">
								<Text fontWeight="medium">Subtotal:</Text>
								<Text fontWeight="bold" color="#604538">
									{cartTotal}
								</Text>
							</HStack>

							{/* Visual separator */}
							<Box pt={2} pb={2} borderBottom="1px solid" borderColor="gray.200" width="100%" />

							{/* Checkout button */}
							<Button
								colorScheme="brown"
								bg="#A47864"
								width="100%"
								_hover={{ bg: "#604538" }}
								onClick={handleCheckout}>
								Proceed to Checkout
							</Button>

							{/* Clear cart button */}
							<ButtonGroup width="100%">
								<Button
									variant="outline"
									colorScheme="brown"
									width="100%"
									onClick={handleClearCart}>
									<FiTrash2 style={{ marginRight: "8px" }} />
									Clear Cart
								</Button>
							</ButtonGroup>
						</Drawer.Footer>
					)}
				</Drawer.Content>
			</Drawer.Positioner>
		</Drawer.Root>
	);
}
