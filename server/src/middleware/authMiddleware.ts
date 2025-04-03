import { Request, Response, NextFunction } from "express";
import { MESSAGES } from "../constants/messages";
import { API } from "../constants/api";
import { API as SharedAPI } from "../../../front/src/constants/api";

// Extending Express Request type to include user
declare global {
	namespace Express {
		interface Request {
			user?: any;
		}
	}
}

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	try {
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			res.status(API.STATUS_CODES.UNAUTHORIZED).json({
				success: false,
				message: MESSAGES.ERROR.AUTH.REQUIRED,
			});
			return;
		}

		// In a real app, verify JWT token and extract user info
		// For now, we'll mock it
		if (token === SharedAPI.MOCK.JWT_TOKEN) {
			req.user = { id: 1, role: "admin" };
			next();
		} else {
			res.status(API.STATUS_CODES.UNAUTHORIZED).json({
				success: false,
				message: MESSAGES.ERROR.AUTH.INVALID_TOKEN,
			});
		}
	} catch (error) {
		res.status(API.STATUS_CODES.UNAUTHORIZED).json({
			success: false,
			message: MESSAGES.ERROR.AUTH.FAILED,
		});
	}
};
