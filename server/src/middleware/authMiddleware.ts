import { Request, Response, NextFunction } from "express";

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
			res.status(401).json({ success: false, message: "Authentication required" });
			return;
		}

		// In a real app, verify JWT token and extract user info
		// For now, we'll mock it
		if (token === "mock-jwt-token") {
			req.user = { id: 1, role: "admin" };
			next();
		} else {
			res.status(401).json({ success: false, message: "Invalid token" });
		}
	} catch (error) {
		res.status(401).json({ success: false, message: "Authentication failed" });
	}
};
