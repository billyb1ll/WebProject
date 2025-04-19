import {
	Button,
	CloseButton,
	Dialog,
	Portal,
	Checkbox,
	Link,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { COLORS } from "@/constants/colors";

interface TermDialogProps {
	termsAccepted: boolean;
	setTermsAccepted: (accepted: boolean) => void;
}

export default function TermDialog({
	termsAccepted,
	setTermsAccepted,
}: TermDialogProps) {
	const [isOpen, setIsOpen] = useState(false);
	// New internal state to track checkbox
	const [internalChecked, setInternalChecked] = useState(termsAccepted);

	// Keep internal state in sync with external prop
	useEffect(() => {
		setInternalChecked(termsAccepted);
	}, [termsAccepted]);

	const handleAgree = () => {
		setIsOpen(false);
		setInternalChecked(true);
		setTermsAccepted(true);
	};

	const handleCancel = () => {
		setIsOpen(false);
		setInternalChecked(false);
		setTermsAccepted(false);
	};

	const handleCheckboxChange = (checked: boolean) => {
		setInternalChecked(checked);

		if (checked) {
			setIsOpen(true);
		} else {
			setTermsAccepted(false);
		}
	};

	return (
		<>
			<Checkbox.Root
				checked={internalChecked}
				onCheckedChange={(e) => handleCheckboxChange(!!e.checked)}>
				<Dialog.Root
					open={isOpen}
					onOpenChange={({ open }) => {
						setIsOpen(open);
						if (!open) {
							setInternalChecked(false);
							setTermsAccepted(false);
						}
					}}
					placement="center"
					size="lg"
					motionPreset="scale"
					scrollBehavior="outside"
					closeOnEscape={true}
					closeOnInteractOutside={true}
					trapFocus={true}
					role="dialog"
					aria-label="Terms and Conditions Dialog">
					<Portal>
						<Dialog.Backdrop />
						<Dialog.Positioner>
							<Dialog.Content p={5} style={{ width: "100%" }}>
								<Dialog.Header>
									<Dialog.Title>Terms and Conditions</Dialog.Title>
								</Dialog.Header>
								<Dialog.Body>
									<p style={{ marginBottom: "1rem", fontSize: "0.875rem" }}>
										Here are the terms and conditions. Please read them carefully before
										proceeding. By clicking "Agree", you accept these terms and
										conditions.
									</p>
								</Dialog.Body>
								<Dialog.Footer style={{ display: "flex", gap: "1rem" }}>
									<Button
										onClick={handleCancel}
										style={{
											background: "white",
											color: COLORS.BRAND_PRIMARY,
											borderColor: COLORS.BRAND_PRIMARY,
										}}>
										Cancel
									</Button>
									<Button
										onClick={handleAgree}
										_hover={{ borderColor: COLORS.BRAND_DARK }}
										style={{ background: COLORS.BRAND_PRIMARY }}>
										Agree
									</Button>
								</Dialog.Footer>
								<Dialog.CloseTrigger asChild>
									<CloseButton size="sm" style={{ background: "transparent" }} />
								</Dialog.CloseTrigger>
							</Dialog.Content>
						</Dialog.Positioner>
					</Portal>
				</Dialog.Root>

				<Checkbox.HiddenInput />
				<Checkbox.Control background={COLORS.BRAND_PRIMARY} borderRadius={"6px"} />
				<Checkbox.Label>
					I agree to the{" "}
					<Link
						href="#"
						color={COLORS.BRAND_PRIMARY}
						onClick={(e) => {
							e.preventDefault();
							setIsOpen(true);
						}}
						_hover={{ fontWeight: "bold", color: COLORS.BRAND_PRIMARY }}>
						terms and conditions
					</Link>
				</Checkbox.Label>
			</Checkbox.Root>
		</>
	);
}
