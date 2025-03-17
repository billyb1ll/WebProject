import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { apiRouter } from "./routes";
import { errorHandler } from "./middleware/errorHandler";

// Initialize express app
const app: Application = express();

// Apply middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use("/api", apiRouter);

// Default route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to the API" });
});

// Error handling middleware (should be last)
app.use(errorHandler);

export default app;
