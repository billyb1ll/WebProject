import { Box, Text } from "@chakra-ui/react";

interface MessageDisplayProps {
	message: string;
}

export default function MessageDisplay({ message }: MessageDisplayProps) {
	return (
		<Box textAlign="center" mt="8" width="full" px="4">
			<Text color="gray.600" className="animate__animated animate__fadeIn">{message}</Text>
		</Box>
	);
}
