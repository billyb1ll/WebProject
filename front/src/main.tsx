import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "@/components/ui/provider";

// Debug message to confirm script is running
console.log("App is initializing...");

const rootElement = document.getElementById("root");
if (!rootElement) {
	console.error("Root element not found!");
} else {
	console.log("Root element found, mounting React app...");

	createRoot(rootElement).render(
		<StrictMode>
			<Provider>
				<App />
			</Provider>
		</StrictMode>
	);

	console.log("React app mounted successfully!");
}
