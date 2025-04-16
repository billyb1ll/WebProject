import { Request, Response } from "express";
import { API } from "../constants/api";
import { MESSAGES } from "../constants/messages";
import { pool } from "../config/database";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthController {
	/**
	 * Register a new user
	 */
	public register = async (req: Request, res: Response): Promise<void> => {
		const connection = await pool.getConnection();
		try {
			await connection.beginTransaction();

			const { firstName, lastName, email, password } = req.body;
			const fullName = `${firstName} ${lastName}`.trim();

			// Validate input
			if (!firstName || !email || !password) {
				res.status(API.STATUS_CODES.BAD_REQUEST).json({
					success: false,
					message: "Missing required fields",
				});
				return;
			}

			// Check if email already exists
			const [existingUsers] = await connection.query(
				"SELECT c_id FROM customer WHERE c_email = ?",
				[email]
			);

			if ((existingUsers as any[]).length > 0) {
				res.status(API.STATUS_CODES.CONFLICT).json({
					success: false,
					message: "Email already in use",
				});
				return;
			}

			// Hash password
			const saltRounds = 10;
			const hashedPassword = await bcrypt.hash(password, saltRounds);

			// Create dummy address and phone for testing purposes
			// In a real application, these would be provided by the user
			const dummyAddress = "123 Main St, City, Country";
			const dummyPhone = `+1${
				Math.floor(Math.random() * 9000000000) + 1000000000
			}`;

			// Create user
			const [result] = await connection.query(
				"INSERT INTO customer (c_name, c_email, c_pass, c_address, c_phone_num, c_created_at) VALUES (?, ?, ?, ?, ?, NOW())",
				[fullName, email, hashedPassword, dummyAddress, dummyPhone]
			);

			const userId = (result as any).insertId;

			// Generate JWT token
			const token = jwt.sign(
				{ id: userId, email, role: "customer" },
				process.env.JWT_SECRET || "your-secret-key",
				{ expiresIn: "24h" }
			);

			// Fetch the created user
			const [userRows] = await connection.query(
				"SELECT c_id, c_name, c_email FROM customer WHERE c_id = ?",
				[userId]
			);

			const user = (userRows as any[])[0];

			await connection.commit();

			res.status(API.STATUS_CODES.CREATED).json({
				success: true,
				message: "User registered successfully",
				token,
				user: {
					id: user.c_id,
					firstName: user.c_name.split(" ")[0],
					lastName: user.c_name.split(" ").slice(1).join(" "),
					email: user.c_email,
					role: "customer",
				},
			});
		} catch (error) {
			await connection.rollback();
			console.error("Registration error:", error);
			res.status(API.STATUS_CODES.SERVER_ERROR).json({
				success: false,
				message: "Failed to register user",
			});
		} finally {
			connection.release();
		}
	};

	/**
	 * Validate registration data (check if email exists)
	 */
	public validate = async (req: Request, res: Response): Promise<void> => {
		try {
			const { email } = req.body;

			// If no email to validate, just return success
			if (!email) {
				res.status(API.STATUS_CODES.OK).json({
					success: true,
					errors: [],
				});
				return;
			}

			// Check if email already exists
			const [existingUsers] = await pool.query(
				"SELECT c_id FROM customer WHERE c_email = ?",
				[email]
			);

			if ((existingUsers as any[]).length > 0) {
				res.status(API.STATUS_CODES.OK).json({
					success: true,
					errors: [
						{
							field: "email",
							message: "This email is already registered",
						},
					],
				});
				return;
			}

			// No validation errors
			res.status(API.STATUS_CODES.OK).json({
				success: true,
				errors: [],
			});
		} catch (error) {
			console.error("Validation error:", error);
			res.status(API.STATUS_CODES.SERVER_ERROR).json({
				success: false,
				message: "Validation failed",
			});
		}
	};


	/**
	 * Unified login - automatically determines if the user is a customer or admin
	 */
	public unifiedLogin = async (req: Request, res: Response): Promise<void> => {
		try {
			const { email, password } = req.body;

			// Validate input
			if (!email || !password) {
				res.status(API.STATUS_CODES.BAD_REQUEST).json({
					success: false,
					message: "Email and password are required",
				});
				return;
			}

			// try customer login (by email)
			const [customerRows] = await pool.query(
				"SELECT c_id, c_name, c_email, c_pass FROM customer WHERE c_email = ?",
				[email]
			);

			const customers = customerRows as any[];

			if (customers.length > 0) {
				const customer = customers[0];
				// Compare password
				const isPasswordValid = await bcrypt.compare(password, customer.c_pass);

				if (isPasswordValid) {
					// Valid customer login
					const token = jwt.sign(
						{ id: customer.c_id, email: customer.c_email, role: "customer" },
						process.env.JWT_SECRET || "your-secret-key",
						{ expiresIn: "24h" }
					);

					// Split name into first and last name
					const nameParts = customer.c_name.split(" ");
					const firstName = nameParts[0];
					const lastName = nameParts.slice(1).join(" ");

					res.status(API.STATUS_CODES.OK).json({
						success: true,
						message: "Login successful",
						token,
						user: {
							id: customer.c_id,
							firstName: firstName,
							lastName: lastName,
							email: customer.c_email,
							role: "customer",
						},
					});
					return;
				}
			}

			// If not a valid customer, try admin login
			// Check if the email is a username in the admin table
			const [adminRows] = await pool.query(
				"SELECT log_id, username, pass, a_role FROM admin_login WHERE username = ? AND is_active = TRUE",
				[email]
			);

			const admins = adminRows as any[];

			if (admins.length > 0) {
				const admin = admins[0];
				// Compare password
				const isPasswordValid = await bcrypt.compare(password, admin.pass);

				if (isPasswordValid) {
					// Valid admin login
					// Get admin info
					const [adminInfoRows] = await pool.query(
						"SELECT a_id, a_firstname, a_lastname, a_email, a_role FROM admin_info WHERE log_id = ?",
						[admin.log_id]
					);
					const adminInfo = (adminInfoRows as any[])[0];
					// Check if admin info exists
					if (!adminInfo) {
						console.error(`No admin_info record found for log_id: ${admin.log_id}`);
						res.status(API.STATUS_CODES.UNAUTHORIZED).json({
							success: false,
							message: "Admin account incomplete. Contact system administrator.",
						});
						return;
					}

					// Generate JWT token
					const token = jwt.sign(
						{
							id: adminInfo.a_id,
							email: adminInfo.a_email,
							role: adminInfo.a_role,
						},
						process.env.JWT_SECRET || "your-secret-key",
						{ expiresIn: "24h" }
					);

					// Update last login
					await pool.query(
						"UPDATE admin_login SET last_login = NOW() WHERE log_id = ?",
						[admin.log_id]
					);

					res.status(API.STATUS_CODES.OK).json({
						success: true,
						message: "Login successful",
						token,
						user: {
							id: adminInfo.a_id,
							firstName: adminInfo.a_firstname,
							lastName: adminInfo.a_lastname,
							email: adminInfo.a_email,
							role: adminInfo.a_role,
						},
					});
					return;
				}
			}

			// If we get here, no valid credentials were found
			res.status(API.STATUS_CODES.UNAUTHORIZED).json({
				success: false,
				message: "Invalid credentials",
			});
		} catch (error) {
			console.error("Unified login error:", error);
			res.status(API.STATUS_CODES.SERVER_ERROR).json({
				success: false,
				message: "Login failed",
			});
		}
	};

	/**
	 * Get user profile
	 */
	public getProfile = async (req: Request, res: Response): Promise<void> => {
		try {
			// req.user is set by authMiddleware
			const userId = req.user?.id;

			const [rows] = await pool.query(
				"SELECT c_id, c_name, c_email FROM customer WHERE c_id = ?",
				[userId]
			);

			if ((rows as any[]).length === 0) {
				res.status(API.STATUS_CODES.NOT_FOUND).json({
					success: false,
					message: "User not found",
				});
				return;
			}

			const user = (rows as any[])[0];

			// Split name into first and last name
			const nameParts = user.c_name.split(" ");
			const firstName = nameParts[0];
			const lastName = nameParts.slice(1).join(" ");

			res.status(API.STATUS_CODES.OK).json({
				success: true,
				data: {
					id: user.c_id,
					firstName: firstName,
					lastName: lastName,
					email: user.c_email,
					role: "customer",
				},
			});
		} catch (error) {
			console.error("Get profile error:", error);
			res.status(API.STATUS_CODES.SERVER_ERROR).json({
				success: false,
				message: "Failed to get user profile",
			});
		}
	};

	/**
	 * Login admin
	 */
	public adminLogin = async (req: Request, res: Response): Promise<void> => {
		try {
			const { username, password } = req.body;

			// Validate input
			if (!username || !password) {
				res.status(API.STATUS_CODES.BAD_REQUEST).json({
					success: false,
					message: "Username and password are required",
				});
				return;
			}

			// Get admin with password
			const [rows] = await pool.query(
				"SELECT log_id, username, pass, a_role FROM admin_login WHERE username = ? AND is_active = TRUE",
				[username]
			);

			const admins = rows as any[];

			if (admins.length === 0) {
				res.status(API.STATUS_CODES.UNAUTHORIZED).json({
					success: false,
					message: "Invalid username or password",
				});
				return;
			}

			const admin = admins[0];

			// Compare password
			const isPasswordValid = await bcrypt.compare(password, admin.pass);

			if (!isPasswordValid) {
				res.status(API.STATUS_CODES.UNAUTHORIZED).json({
					success: false,
					message: "Invalid username or password",
				});
				return;
			}

			// Get admin info
			const [adminInfoRows] = await pool.query(
				"SELECT a_id, a_firstname, a_lastname, a_email, a_role FROM admin_info WHERE log_id = ?",
				[admin.log_id]
			);

			const adminInfo = (adminInfoRows as any[])[0];

			// Check if admin info exists
			if (!adminInfo) {
				console.error(`No admin_info record found for log_id: ${admin.log_id}`);
				res.status(API.STATUS_CODES.UNAUTHORIZED).json({
					success: false,
					message: "Admin account incomplete. Contact system administrator.",
				});
				return;
			}

			// Generate JWT token
			const token = jwt.sign(
				{
					id: adminInfo.a_id,
					email: adminInfo.a_email,
					role: adminInfo.a_role,
				},
				process.env.JWT_SECRET || "your-secret-key",
				{ expiresIn: "24h" }
			);

			// Update last login
			await pool.query(
				"UPDATE admin_login SET last_login = NOW() WHERE log_id = ?",
				[admin.log_id]
			);

			res.status(API.STATUS_CODES.OK).json({
				success: true,
				message: "Login successful",
				token,
				user: {
					id: adminInfo.a_id,
					firstName: adminInfo.a_firstname,
					lastName: adminInfo.a_lastname,
					email: adminInfo.a_email,
					role: adminInfo.a_role,
				},
			});
		} catch (error) {
			console.error("Admin login error:", error);
			res.status(API.STATUS_CODES.SERVER_ERROR).json({
				success: false,
				message: "Login failed",
			});
		}
	};

	/**
	 * Get admin profile
	 */
	public getAdminProfile = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			// req.user is set by authMiddleware
			const adminId = req.user?.id;

			const [rows] = await pool.query(
				`SELECT a.a_id, a.a_firstname, a.a_lastname, a.a_email, a.a_role, l.last_login
				FROM admin_info a
				JOIN admin_login l ON a.log_id = l.log_id
				WHERE a.a_id = ?`,
				[adminId]
			);

			if ((rows as any[]).length === 0) {
				res.status(API.STATUS_CODES.NOT_FOUND).json({
					success: false,
					message: "Admin not found",
				});
				return;
			}

			const admin = (rows as any[])[0];

			res.status(API.STATUS_CODES.OK).json({
				success: true,
				data: {
					id: admin.a_id,
					firstName: admin.a_firstname,
					lastName: admin.a_lastname,
					email: admin.a_email,
					role: admin.a_role,
					lastLogin: admin.last_login,
				},
			});
		} catch (error) {
			console.error("Get admin profile error:", error);
			res.status(API.STATUS_CODES.SERVER_ERROR).json({
				success: false,
				message: "Failed to get admin profile",
			});
		}
	};
}
