/**
 * Database connection configuration
 * @debug If connection issues occur, verify these settings match your environment
 */
import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create connection pool
export const pool = mysql.createPool({
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "",
	database: process.env.DB_NAME || "ratamoth_db",
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

// Debug helper - can be called to test database connection
export const testConnection = async () => {
	try {
		const connection = await pool.getConnection();
		console.log("Database connection test successful");

		// Log database connection details (excluding password) for debugging
		console.debug("Connected to:", {
			host: process.env.DB_HOST || "localhost",
			user: process.env.DB_USER || "root",
			database: process.env.DB_NAME || "ratamoth_db",
		});

		connection.release();
		return true;
	} catch (error) {
		console.error("Database connection test failed:", error);
		return false;
	}
};
