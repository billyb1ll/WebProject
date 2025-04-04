import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	optimizeDeps: {
		exclude: ["__vite-browser-external"],
	},
	build: {
		sourcemap: true,
		commonjsOptions: {
			transformMixedEsModules: true,
		},
	},
	server: {
		open: true,
		port: 5173,
	},
});
