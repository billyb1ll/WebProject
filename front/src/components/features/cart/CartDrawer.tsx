/**
 * CartDrawer Component
 *
 * A slide-out drawer that displays the user's shopping cart contents.
 * Allows users to view, update quantities, and remove items from their cart.
 * Also provides options to proceed to checkout or clear the entire cart.
 */
import React, { useState } from "react";
import {
	Drawer,
	Dialog,
	Button,
	ButtonGroup,
	Box,
	Text,
	VStack,
	HStack,
	Image,
	FormatNumber,
	IconButton,
	Badge,
	Input,
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
	const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
	const [itemToRemove, setItemToRemove] = useState<string | null>(null);

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
	 * Opens confirmation dialog when trying to reduce quantity below 1
	 * @param {string} itemId - ID of the item to possibly remove
	 */
	const handlePossibleRemove = (itemId: string) => {
		setItemToRemove(itemId);
		setIsRemoveDialogOpen(true);
	};

	/**
	 * Confirms item removal after dialog confirmation
	 */
	const confirmRemove = () => {
		if (itemToRemove) {
			handleRemoveItem(itemToRemove);
			setItemToRemove(null);
		}
		setIsRemoveDialogOpen(false);
	};

	/**
	 * Cancels the removal operation
	 */
	const cancelRemove = () => {
		setItemToRemove(null);
		setIsRemoveDialogOpen(false);
	};

	/**
	 * Updates the quantity of an item and refreshes the UI
	 * If the new quantity is less than 1, it triggers the removal confirmation
	 * @param {string} itemId - ID of the item to update
	 * @param {number} newQuantity - The new quantity value
	 */
	const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
		if (newQuantity < 1) {
			handlePossibleRemove(itemId);
			return;
		} else if (newQuantity > 100) {
			toaster.create({
				title: "Error",
				description: "Maximum quantity is 100",
				type: "error",
				duration: 2000,
			});
			return;
		}
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
		<>
			<Drawer.Root open={isOpen} onOpenChange={onClose} size="md" placement="end">
				<Drawer.Backdrop />
				<Drawer.Positioner>
					<Drawer.Content>
						{/* Close button and header */}
						<Drawer.CloseTrigger
							position="absolute"
							top="3"
							right="3"
							border="0px solid #E8DDD8"
							bg="transparent"
							aria-label="Close cart drawer">
							{/* Using Icon instead of CloseButton */}
							<Box as="span" color="#604538" fontSize="md">
								✕
							</Box>
						</Drawer.CloseTrigger>
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
							<Dialog.Root
								open={isRemoveDialogOpen}
								onOpenChange={(details) => setIsRemoveDialogOpen(details.open)}>
								<Dialog.Backdrop />
								<Dialog.Positioner>
									<Dialog.Content p={4}>
										<Dialog.Header>
											<Dialog.Title>Remove Item</Dialog.Title>
											<Dialog.CloseTrigger asChild>
												<Box
													as="button"
													bg="transparent"
													color="#604538"
													display="flex"
													alignItems="center"
													justifyContent="center"
													cursor="pointer"
													onClick={cancelRemove}>
													✕
												</Box>
											</Dialog.CloseTrigger>
										</Dialog.Header>
										<Dialog.Body>
											<Text>
												Are you sure you want to remove this item from your cart?
											</Text>
										</Dialog.Body>
										<Dialog.Footer>
											<Button
												variant="outline"
												mr={3}
												onClick={cancelRemove}
												bg="transparent">
												Cancel
											</Button>
											<Button
												colorScheme="red"
												onClick={confirmRemove}
												bg="#A47864"
												_hover={{ bg: "#604538" }}>
												Remove
											</Button>
										</Dialog.Footer>
									</Dialog.Content>
								</Dialog.Positioner>
							</Dialog.Root>
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
														<FormatNumber
															value={item.price * item.quantity}
															currency="USD"
															style="currency"
														/>
													</Text>

													<HStack>
														{/* Decrease quantity button */}
														<IconButton
															aria-label="Decrease quantity"
															size="xs"
															bg="white"
															colorScheme="brown"
															variant="outline"
															onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
															<FiMinus size={14} />
														</IconButton>

														{/* Quantity display */}
														<Input
															type="number"
															value={item.quantity}
															size="xs"
															width="60px"
															textAlign="center"
															onChange={(e) =>
																handleUpdateQuantity(item.id, Number(e.target.value))
															}
															aria-label="Item quantity"
															max={100}
															borderWidth="1px"
															borderColor="#E8DDD8"
															borderRadius="md"
															min={1}
															maxLength={2}
															fontSize="sm"
															bg="white"
															_focus={{ borderColor: "#A47864" }}
															_placeholder={{ color: "gray.400" }}
														/>

														{/* Increase quantity button */}
														<IconButton
															aria-label="Increase quantity"
															size="xs"
															bg="white"
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
															bg="white"
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
								<Box
									pt={2}
									pb={2}
									borderBottom="1px solid"
									borderColor="gray.200"
									width="100%"
								/>

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
										bg="transparent"
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
		</>
	);
}
