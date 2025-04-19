import { Request, Response, NextFunction } from "express";
import { API } from "../constants/api";
import { MESSAGES } from "../constants/messages";
import jwt from "jsonwebtoken";

// Extending Express Request type to include user
declare global {
	namespace Express {
		interface Request {
			user?: {
				id: number;
				email: string;
				role: string;
			};
		}
	}
}

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		// Get token from Authorization header
		const authHeader = req.headers.authorization;
		const token = authHeader?.startsWith("Bearer ")
			? authHeader.substring(7)
			: authHeader;

		if (!token) {
			res.status(API.STATUS_CODES.UNAUTHORIZED).json({
				success: false,
				message: MESSAGES.ERROR.AUTH.REQUIRED,
			});
			return;
		}

		// Verify JWT token
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET || "your-secret-key"
		) as jwt.JwtPayload;

		// Add user info to request object
		req.user = {
			id: decoded.id as number,
			email: decoded.email as string,
			role: decoded.role as string,
		};

		next();
	} catch (error) {
		const err = error as Error;
		if (err.name === "JsonWebTokenError") {
			res.status(API.STATUS_CODES.UNAUTHORIZED).json({
				success: false,
				message: MESSAGES.ERROR.AUTH.INVALID_TOKEN,
			});
		} else if (err.name === "TokenExpiredError") {
			res.status(API.STATUS_CODES.UNAUTHORIZED).json({
				success: false,
				message: "Token expired",
			});
		} else {
			console.error("Auth middleware error:", error);
			res.status(API.STATUS_CODES.UNAUTHORIZED).json({
				success: false,
				message: MESSAGES.ERROR.AUTH.FAILED,
			});
		}
	}
};

/**
 * Middleware to check if user is an admin
 */
export const adminAuthMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	// First, run the standard auth middleware
	authMiddleware(req, res, async () => {
		// Check if user exists and has admin role
		if (req.user?.role !== "admin") {
			return res.status(API.STATUS_CODES.FORBIDDEN).json({
				success: false,
				message: "Admin access required for this resource",
			});
		}

		next();
	});
};

/**
 * Middleware to check specific user roles
 * @param roles - Array of allowed roles
 */
export const roleAuthMiddleware = (roles: string[]) => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		// First, run the standard auth middleware
		authMiddleware(req, res, async () => {
			// Check if user role is in the allowed roles
			if (!req.user || !roles.includes(req.user.role)) {
				return res.status(API.STATUS_CODES.FORBIDDEN).json({
					success: false,
					message: "You don't have permission to access this resource",
				});
			}

			next();
		});
	};
};
