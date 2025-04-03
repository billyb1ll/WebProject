import { Request, Response } from "express";
import { Admin } from "../types/admin";
import { MESSAGES } from "../constants/messages";
import { API } from "../constants/api";
import { API as SharedAPI } from "../../../front/src/constants/api";

export class AdminController {
	// Login admin
	public login = async (req: Request, res: Response): Promise<void> => {
		try {
			const { username, password } = req.body;

			// In a real app, validate credentials against database and use proper auth
			if (username === "admin" && password === "password") {
				res.status(API.STATUS_CODES.OK).json({
					success: true,
					token: SharedAPI.MOCK.JWT_TOKEN,
					user: { id: 1, username, role: "admin" },
				});
			} else {
				res.status(API.STATUS_CODES.UNAUTHORIZED).json({
					success: false,
					message: MESSAGES.ADMIN.INVALID_CREDENTIALS,
				});
			}
		} catch (error) {
			res.status(API.STATUS_CODES.SERVER_ERROR).json({
				success: false,
				message: MESSAGES.ERROR.LOGIN,
			});
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

			res.status(API.STATUS_CODES.OK).json({ success: true, data: admin });
		} catch (error) {
			res.status(API.STATUS_CODES.SERVER_ERROR).json({
				success: false,
				message: MESSAGES.ADMIN.PROFILE_ERROR,
			});
		}
	};

	// Update admin profile
	public updateProfile = async (req: Request, res: Response): Promise<void> => {
		try {
			const profileData = req.body;
			// In a real app, update in database
			res.status(API.STATUS_CODES.OK).json({
				success: true,
				data: { id: 1, ...profileData },
				message: MESSAGES.ADMIN.UPDATE_SUCCESS,
			});
		} catch (error) {
			res
				.status(API.STATUS_CODES.SERVER_ERROR)
				.json({ success: false, message: MESSAGES.ADMIN.UPDATE_ERROR });
		}
	};
}
