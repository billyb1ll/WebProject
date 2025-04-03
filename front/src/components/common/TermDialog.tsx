import {
	Button,
	CloseButton,
	Dialog,
	Portal,
	Checkbox,
	Link,
} from "@chakra-ui/react";
import { useState } from "react";
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

	const handleAgree = () => {
		setTermsAccepted(true);
		setIsOpen(false);
	};

	const handleCancel = () => {
		setTermsAccepted(false);
		setIsOpen(false);
	};

	return (
		<>
			<Checkbox.Root
				checked={termsAccepted}
				onCheckedChange={(e) =>
					e.checked ? setIsOpen(true) : setTermsAccepted(false)
				}>
				<Dialog.Root
					open={isOpen}
					onOpenChange={({ open }) => setIsOpen(open)}
					placement={"center"}
					size="lg"
					motionPreset="scale">
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
