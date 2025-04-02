"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

export function Provider(props: ColorModeProviderProps) {
	console.log("Initializing Provider...");
	return (
		<ChakraProvider value={defaultSystem}>
			<ColorModeProvider {...props}>{props.children}</ColorModeProvider>
		</ChakraProvider>
	);
}
