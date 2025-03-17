import { Request, Response } from "express";
import { Admin } from "../types/admin";

export class AdminController {
	// Login admin
	public login = async (req: Request, res: Response): Promise<void> => {
		try {
			const { username, password } = req.body;

			// In a real app, validate credentials against database and use proper auth
			if (username === "admin" && password === "password") {
				res.status(200).json({
					success: true,
					token: "mock-jwt-token",
					user: { id: 1, username, role: "admin" },
				});
			} else {
				res.status(401).json({ success: false, message: "Invalid credentials" });
			}
		} catch (error) {
			res.status(500).json({ success: false, message: "Login failed" });
		}
	};

	// Get admin profile
	public getProfile = async (req: Request, res: Response): Promise<void> => {
		try {
			// In a real app, get from database using authenticated user ID
			const admin: Admin = {
				id: 1,
				username: "admin",
				firstName: "Admin",
				lastName: "User",
				email: "admin@example.com",
				role: "admin",
			};

			res.status(200).json({ success: true, data: admin });
		} catch (error) {
			res.status(500).json({ success: false, message: "Failed to fetch profile" });
		}
	};

	// Update admin profile
	public updateProfile = async (req: Request, res: Response): Promise<void> => {
		try {
			const profileData = req.body;
			// In a real app, update in database
			res.status(200).json({
				success: true,
				data: { id: 1, ...profileData },
				message: "Profile updated successfully",
			});
		} catch (error) {
			res
				.status(500)
				.json({ success: false, message: "Failed to update profile" });
		}
	};
}
