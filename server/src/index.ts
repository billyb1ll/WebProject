import app from "./app";
import dotenv from "dotenv";
import path from "path";
import { importDatabaseSchema } from "./utils/dbUtils";
import { pool } from "./config/database";

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 3000;
const SQL_FILE_PATH = path.resolve(__dirname, "../../database/ratamoth_db.sql");

/**
 * Tests database connection and logs result
 * @returns {Promise<boolean>} True if connection successful, false otherwise
 * @debug Use for diagnosing database connectivity issues
 */
const testDatabaseConnection = async () => {
	try {
		const connection = await pool.getConnection();
		console.log("✅ Database connection successful");
		connection.release();
		return true;
	} catch (error) {
		console.error("❌ Database connection failed:", error);
		return false;
	}
};

/**
 * Initializes the server and handles database connection
 * @debug Check here for server startup issues and DB connection problems
 */
const startServer = async () => {
	try {
		const isDbConnected = await testDatabaseConnection();

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);

			if (isDbConnected) {
				console.log("Server is ready to handle database operations");
				// Uncomment to initialize DB from SQL file
				// await importDatabaseSchema(SQL_FILE_PATH);
			} else {
				console.log(
					"Server started, but database connection failed. Please check your database configuration."
				);
			}
		});
	} catch (error) {
		console.error("Failed to start server:", error);
		process.exit(1);
	}
};

startServer();
