import { pool } from "../config/database";
import fs from "fs";
import path from "path";

/**
 * Import database schema from SQL file
 * @param {string} sqlFilePath - Path to the SQL file containing schema
 * @debug If schema import fails, check file path, file contents, and database connection
 * @debug Common errors: 1) Syntax errors in SQL 2) DB user permissions 3) File not found
 */
export const importDatabaseSchema = async (
	sqlFilePath: string
): Promise<void> => {
	try {
		console.log(`Initializing database from: ${sqlFilePath}`);

		// Check if file exists before attempting to read
		if (!fs.existsSync(sqlFilePath)) {
			console.error(`SQL file not found at path: ${sqlFilePath}`);
			throw new Error(`SQL file not found: ${sqlFilePath}`);
		}

		const sql = fs.readFileSync(sqlFilePath, "utf8");
		const statements = sql
			.split(";")
			.filter((statement) => statement.trim() !== "");

		console.debug(`Found ${statements.length} SQL statements to execute`);

		const connection = await pool.getConnection();

		try {
			for (const [index, statement] of statements.entries()) {
				const query = `${statement};`;
				if (query.trim().length > 1) {
					try {
						// Log every 10th statement to avoid excessive logging
						if (index % 10 === 0) {
							console.debug(`Executing statement ${index + 1}/${statements.length}`);
						}
						await connection.query(query);
					} catch (error) {
						// Enhanced error logging for SQL errors
						console.error(`Error executing SQL statement #${index + 1}:`, error);
						console.debug(`Problematic SQL: ${query.substring(0, 150)}...`);
						throw error;
					}
				}
			}
			console.log("Database schema imported successfully");
		} catch (error) {
			console.error("Error importing database schema:", error);
			throw error;
		} finally {
			connection.release();
		}
	} catch (error) {
		console.error("Failed to import database schema:", error);
		throw error;
	}
};
