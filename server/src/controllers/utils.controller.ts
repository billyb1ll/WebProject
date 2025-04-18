import { Request, Response } from "express";
import { MESSAGES } from "../constants/messages";
import { API } from "../constants/api";
import { pool } from "../config/database";

export class UtilsController {
	// Method to get all products
	public async getAllReviews(req: Request, res: Response) {
		try {
			const [rows] = await pool.query("SELECT * FROM reviews");
			res.status(200).json(rows);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: MESSAGES.ERROR.SERVER.ERROR });
		}
	}
}
