import { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
	statusCode?: number;
	status?: string;
}

export const errorHandler = (
	err: AppError,
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		success: false,
		message: err.message || "Internal Server Error",
		error: process.env.NODE_ENV === "development" ? err.stack : undefined,
	});
};
